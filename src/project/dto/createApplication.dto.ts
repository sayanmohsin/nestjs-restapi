import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Validate,
} from "class-validator";
import { IsIdExistConstraint } from "../../shared/validators";

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @Validate(IsIdExistConstraint, ["project", "projectId"])
  projectId: string;
}
