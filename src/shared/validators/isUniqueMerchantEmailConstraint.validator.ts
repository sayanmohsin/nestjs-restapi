import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { PrismaService } from "../../prisma/prisma.service";
import { RoleService } from "../../user/services/roleService";

@ValidatorConstraint({
  name: "isUniqueMerchantEmail",
  async: true,
})
@Injectable()
export class IsUniqueMerchantEmailConstraint
  implements ValidatorConstraintInterface
{
  private readonly logger = new Logger(
    IsUniqueMerchantEmailConstraint.name,
  );
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleService: RoleService,
  ) {}
  async validate(email: string) {
    const merchantRole =
      await this.roleService.getMerchantRole();

    if (!merchantRole) {
      this.logger.log("Merchant role is missing");
      throw new HttpException(
        "Something wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email,
        isActive: true,
        roles: {
          some: {
            role: {
              name: merchantRole.name,
            },
          },
        },
      },
    });

    return !user;
  }

  defaultMessage() {
    return "Merchant email already exist";
  }
}
