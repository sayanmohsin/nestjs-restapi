import { Injectable } from "@nestjs/common";
import { UserOnRole, Role } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable({})
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  getMerchantRole() {
    return this.prismaService.role.findFirst({
      where: {
        isSystem: true,
        isActive: true,
        name: "Merchant",
      },
    });
  }

  generateRolesArray(
    userRoles: (UserOnRole & {
      role: Role;
    })[],
  ) {
    return userRoles.map((userRole) => userRole.role.name);
  }
}
