import { Module } from "@nestjs/common";
import { MerchantController } from "./controllers/merchantController";
import {
  MerchantService,
  UserService,
  RoleService,
  CompanyService,
  AddressService,
} from "./services";

@Module({
  controllers: [MerchantController],
  providers: [
    MerchantService,
    UserService,
    RoleService,
    CompanyService,
    AddressService,
  ],
  exports: [
    MerchantService,
    UserService,
    RoleService,
    CompanyService,
    AddressService,
  ],
})
export class UserModule {}
