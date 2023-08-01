import { PhoneType } from "@prisma/client";
import {
  IsString,
  IsOptional,
  IsEnum,
  Validate,
} from "class-validator";
import { IsIdExistConstraint } from "../../shared/validators";

export class UpsertAddressDto {
  @IsOptional()
  @IsString()
  @Validate(IsIdExistConstraint, ["address", "addressId"])
  addressId?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  region: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(PhoneType)
  phoneType: PhoneType;
}
