import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class IndustryService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  getIndustries() {
    return this.prismaService.industry.findMany({
      select: {
        industryId: true,
        name: true,
      },
      where: {
        isActive: true,
      },
    });
  }
}
