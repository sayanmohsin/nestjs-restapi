import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { UserModule } from "../user/userModule";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {
  MerchantJwtStrategy,
  RefreshTokenJwtStrategy,
} from "./strategies";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          signOptions: {
            issuer: configService.get<string>("JWT_ISSUER"),
          },
        };
        return options;
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MerchantJwtStrategy,
    RefreshTokenJwtStrategy,
  ],
})
export class AuthModule {}
