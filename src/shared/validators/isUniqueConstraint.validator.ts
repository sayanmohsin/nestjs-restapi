import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { PrismaService } from "../../prisma/prisma.service";

@ValidatorConstraint({ name: "isUnique", async: true })
@Injectable()
export class IsUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly prisma: PrismaService) {}
  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ) {
    const model = validationArguments.constraints[0];
    const field = validationArguments.constraints[1]
      ? validationArguments.constraints[1]
      : validationArguments.property;
    const data = await this.prisma[model]?.findUnique({
      where: {
        [field]: value,
      },
    });

    return !data;
  }

  defaultMessage() {
    return "$property $value is already exist";
  }
}
