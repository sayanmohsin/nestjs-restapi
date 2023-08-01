import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateApplicationDto } from "../dto";
import { applicationSelectApi } from "../contants";

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  createApplication(
    merchantId: string,
    newApplicationData: CreateApplicationDto,
  ) {
    return this.prismaService.application.create({
      data: { ...newApplicationData, ...{ merchantId } },
      select: applicationSelectApi,
    });
  }

  getApplications(merchantId: string) {
    return this.prismaService.application.findMany({
      where: {
        merchantId,
      },
      select: applicationSelectApi,
    });
  }
}
