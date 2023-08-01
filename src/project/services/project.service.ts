import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CompanyService } from "../../user/services";
import { CreateProjectDto } from "../dto";
import { omit } from "lodash";
import { projectSelectApi } from "../contants";

@Injectable()
export class ProjectService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly companyService: CompanyService,
  ) {}

  async createProject(
    merchantId: string,
    newProjectData: CreateProjectDto,
  ) {
    const company =
      await this.companyService.upsertOrGetCompany(
        merchantId,
        newProjectData.company,
      );

    return this.prismaService.project.create({
      data: {
        ...omit(newProjectData, ["company"]),
        ...{
          merchantId,
          companyId: company.companyId,
        },
      },
      select: projectSelectApi,
    });
  }

  getProjects(merchantId: string) {
    return this.prismaService.project.findMany({
      where: {
        merchantId,
        isActive: true,
      },
      select: projectSelectApi,
    });
  }
}
