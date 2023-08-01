import {
  IsString,
  IsOptional,
  IsNotEmpty,
  Validate,
} from "class-validator";
import { UpsertAddressDto } from "./upsertAddress.dto";
import { IsIdExistConstraint } from "../../shared/validators";

export class UpsertCompanyDto {
  @IsOptional()
  @IsString()
  @Validate(IsIdExistConstraint, ["company", "companyId"])
  companyId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  address: UpsertAddressDto;
}
