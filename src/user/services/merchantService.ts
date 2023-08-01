import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { hash } from "argon2";
import { MerchantSignupDto } from "../../auth/dto";
import { PrismaService } from "../../prisma/prisma.service";
import { UserService } from "./userService";
import { RoleService } from "./roleService";
import { userWithPasswordSelectApi } from "../constants";

@Injectable({})
export class MerchantService {
  private readonly logger = new Logger(
    MerchantService.name,
  );
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async merchantSignUp(newMerchantData: MerchantSignupDto) {
    const [merchantRole, passwordHash] = await Promise.all([
      this.roleService.getMerchantRole(),
      hash(newMerchantData.password),
    ]);

    if (!merchantRole) {
      this.logger.log("Merchant role is missing");
      throw new HttpException(
        "Something wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const merchant = await this.prismaService.user.create({
      data: {
        ...newMerchantData,
        password: passwordHash,
        roles: {
          create: {
            roleId: merchantRole.roleId,
          },
        },
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
    return {
      ...merchant,
      roles: this.roleService.generateRolesArray(
        merchant.roles,
      ),
    };
  }

  async getMerchantByEmail(email: string) {
    const merchant =
      await this.prismaService.user.findFirst({
        where: {
          email,
          isActive: true,
        },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });

    if (!merchant) {
      return null;
    }

    return {
      ...merchant,
      roles: this.roleService.generateRolesArray(
        merchant.roles,
      ),
    };
  }

  async getMerchantByIdWithPassword(userId: string) {
    const merchant =
      await this.prismaService.user.findUnique({
        where: {
          userId,
        },
        select: userWithPasswordSelectApi,
      });

    return {
      ...merchant,
      roles: this.roleService.generateRolesArray(
        merchant.roles,
      ),
    };
  }
}
