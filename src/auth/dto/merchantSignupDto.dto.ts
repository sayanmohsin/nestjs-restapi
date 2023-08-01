import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Validate,
} from "class-validator";
import { IsUniqueMerchantEmailConstraint } from "../../shared/validators";

export class MerchantSignupDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(IsUniqueMerchantEmailConstraint)
  email: string;

  @IsNotEmpty()
  password: string;
}
