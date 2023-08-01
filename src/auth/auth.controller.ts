import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  HttpStatus,
  Version,
} from "@nestjs/common";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import {
  Public,
  GetCurrentUserId,
  GetCurrentUser,
} from "./decorators";
import { MerchantSignupDto, UserAuthDto } from "./dto";
import { RefreshTokenGuard } from "./guards";

@Controller("auth")
@ApiTags("Auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("merchant-signup")
  @Version("1")
  @HttpCode(200)
  @ApiBody({ type: MerchantSignupDto })
  @ApiTags("Merchant Sign up")
  merchantSignUp(
    @Body()
    userAuthDto: MerchantSignupDto,
  ) {
    return this.authService.merchantSignup(userAuthDto);
  }

  @Post("merchant-login")
  @Version("1")
  @HttpCode(200)
  @ApiBody({ type: UserAuthDto })
  @ApiTags("Merchant Sign in")
  merchantLogin(@Body() userAuthDto: UserAuthDto) {
    return this.authService.merchantLogin(userAuthDto);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @Version("1")
  @HttpCode(HttpStatus.OK)
  @ApiTags("Refresh token")
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser("refreshToken") refreshToken: string,
  ) {
    return this.authService.refreshTokens(
      userId,
      refreshToken,
    );
  }
}
