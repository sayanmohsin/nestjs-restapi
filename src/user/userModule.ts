import { Module } from '@nestjs/common';
import { MerchantController } from './controllers/merchantController';
import {
  MerchantService,
  UserService,
  RoleService,
  AddressService,
} from './services';

@Module({
  controllers: [MerchantController],
  providers: [MerchantService, UserService, RoleService, AddressService],
  exports: [MerchantService, UserService, RoleService, AddressService],
})
export class UserModule {}
