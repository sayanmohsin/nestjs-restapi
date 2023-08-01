import {
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import {
  MerchantService,
  UserService,
} from "../user/services";
import { MerchantSignupDto, UserAuthDto } from "./dto";
import {
  AuthResponse,
  AuthTokenPayload,
} from "./interfaces";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly merchantService: MerchantService,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  merchantJwtVerify(userId: string) {
    return this.merchantService.getMerchantByIdWithPassword(
      userId,
    );
  }

  async merchantSignup(
    newMerchantData: MerchantSignupDto,
  ): Promise<AuthResponse> {
    const merchant =
      await this.merchantService.merchantSignUp(
        newMerchantData,
      );

    const user: AuthTokenPayload = {
      userId: merchant.userId,
      firstName: merchant.firstName,
      lastName: merchant.firstName,
      email: merchant.email,
      roles: merchant.roles,
    };

    const { accessToken, refreshToken } =
      await this.generateTokens(user);

    await this.userService.updateRefreshToken(
      merchant.userId,
      refreshToken,
    );

    return { user, accessToken, refreshToken };
  }

  async merchantLogin(
    userAuthDto: UserAuthDto,
  ): Promise<AuthResponse> {
    const merchant =
      await this.merchantService.getMerchantByEmail(
        userAuthDto.email,
      );

    if (
      !merchant ||
      !(await verify(
        merchant.password,
        userAuthDto.password,
      ))
    ) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const user: AuthTokenPayload = {
      userId: merchant.userId,
      firstName: merchant.firstName,
      lastName: merchant.firstName,
      email: merchant.email,
      roles: merchant.roles,
    };

    const { accessToken, refreshToken } =
      await this.generateTokens(user);

    await this.userService.updateRefreshToken(
      merchant.userId,
      refreshToken,
    );

    return { user, accessToken, refreshToken };
  }

  async generateTokens(
    signData: AuthTokenPayload,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        signData,
        this.configService.get<string>(
          "JWT_ACCESS_TOKEN_SECRET",
        ),
        this.configService.get<string>(
          "JWT_ACCESS_TOKEN_EXPIRY",
        ),
      ),
      this.signToken(
        signData,
        this.configService.get<string>(
          "JWT_REFRESH_TOKEN_SECRET",
        ),
        this.configService.get<string>(
          "JWT_REFRESH_TOKEN_EXPIRY",
        ),
      ),
    ]);
    return { accessToken, refreshToken };
  }

  signToken(
    signData: AuthTokenPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwt.signAsync(signData, {
      secret,
      expiresIn,
    });
  }

  async refreshTokens(
    userId: string,
    refreshTokenRaw: string,
  ) {
    const userData = await this.userService.getUserById(
      userId,
    );

    if (!userData || !userData.refreshToken) {
      throw new ForbiddenException("Access Denied");
    }

    if (
      !(await verify(
        userData.refreshToken,
        refreshTokenRaw,
      ))
    ) {
      throw new ForbiddenException("Access Denied");
    }

    const user: AuthTokenPayload = {
      userId: userData.userId,
      firstName: userData.firstName,
      lastName: userData.firstName,
      email: userData.email,
      roles: userData.roles,
    };

    const { accessToken, refreshToken } =
      await this.generateTokens(user);

    await this.userService.updateRefreshToken(
      user.userId,
      refreshToken,
    );

    return { user, accessToken, refreshToken };
  }
}
