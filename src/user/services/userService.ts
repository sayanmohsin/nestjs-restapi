import { Injectable } from "@nestjs/common";
import { RoleService } from "./roleService";
import { PrismaService } from "../../prisma/prisma.service";
import { hash } from "argon2";

@Injectable({})
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly roleService: RoleService,
  ) {}

  async getUserById(userId: string) {
    const merchant =
      await this.prismaService.user.findFirst({
        where: {
          userId,
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

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ) {
    return this.prismaService.user.update({
      where: {
        userId,
      },
      data: {
        refreshToken: await hash(refreshToken),
      },
    });
  }
}
