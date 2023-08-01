import {
  Controller,
  Get,
  HttpCode,
  Version,
} from "@nestjs/common";
import { MerchantService } from "../services";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { GetMerchant } from "../../auth/decorators/getMerchant.decorator";
import { User } from "@prisma/client";
import { Roles } from "../../auth/decorators/roles.decorator";

@ApiTags("Merchant")
@Controller("merchants")
@ApiSecurity("bearer")
@Roles(["Merchant"])
export class MerchantController {
  constructor(
    private readonly merchantService: MerchantService,
  ) {}

  @Get("/")
  @Version("1")
  @HttpCode(200)
  getMerchant(@GetMerchant() user: User) {
    return user;
  }
}
