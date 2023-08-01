import {
  Post,
  HttpCode,
  Body,
  Controller,
  Version,
  Get,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiSecurity,
} from "@nestjs/swagger";
import { ProjectService } from "../services";
import { CreateProjectDto } from "../dto";
import {
  GetCurrentUserId,
  Roles,
} from "../../auth/decorators";

@ApiTags("Projects")
@ApiSecurity("bearer")
@Roles(["Merchant"])
@Controller("projects")
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) {}

  @Post("/")
  @Version("1")
  @HttpCode(200)
  @ApiBody({ type: CreateProjectDto })
  @ApiTags("Create Project")
  createProject(
    @GetCurrentUserId() merchantId: string,
    @Body()
    newProjectData: CreateProjectDto,
  ) {
    return this.projectService.createProject(
      merchantId,
      newProjectData,
    );
  }

  @Get("/")
  @Version("1")
  @HttpCode(200)
  @ApiBody({ type: CreateProjectDto })
  @ApiTags("Get Projects")
  getProjects(@GetCurrentUserId() merchantId: string) {
    return this.projectService.getProjects(merchantId);
  }
}
