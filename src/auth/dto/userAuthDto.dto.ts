import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { IsUniqueMerchantEmailConstraint } from "../../shared/validators";

export class UserAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
