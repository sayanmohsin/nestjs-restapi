import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthTokenPayload } from "../interfaces";
import { Request } from "express";

@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  "UserRefreshTokenJwt",
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        "JWT_REFRESH_TOKEN_SECRET",
      ),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthTokenPayload) {
    const refreshToken = req
      .get("authorization")
      .replace("Bearer", "")
      .trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
