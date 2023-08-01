import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Validate,
} from "class-validator";
import { IsIdExistConstraint } from "../../shared/validators";
import { UpsertCompanyDto } from "../../user/dto";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsIdExistConstraint, ["industry", "industryId"])
  industryId: string;

  @IsNotEmpty()
  company: UpsertCompanyDto;
}
