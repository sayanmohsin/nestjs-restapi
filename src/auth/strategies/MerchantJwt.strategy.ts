import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { AuthTokenPayload } from "../interfaces";

@Injectable()
export class MerchantJwtStrategy extends PassportStrategy(
  Strategy,
  "MerchantAccessTokenJwt",
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        "JWT_ACCESS_TOKEN_SECRET",
      ),
    });
  }

  async validate(payload: AuthTokenPayload) {
    const user = await this.authService.merchantJwtVerify(
      payload.userId,
    );
    delete user.password;
    if (!user) {
      throw new HttpException(
        "Unauthorized",
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;
    return user;
  }
}
