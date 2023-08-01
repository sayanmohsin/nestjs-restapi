import {
  Post,
  HttpCode,
  Body,
  Version,
  Controller,
  Get,
} from "@nestjs/common";
import {
  ApiBody,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import {
  GetCurrentUserId,
  Roles,
} from "../../auth/decorators";
import {
  CreateApplicationDto,
  CreateProjectDto,
} from "../dto";
import { ApplicationService } from "../services";

@ApiTags("Application")
@ApiSecurity("bearer")
@Roles(["Merchant"])
@Controller("applications")
export class ApplicationController {
  constructor(
    private applicationService: ApplicationService,
  ) {}

  @Post("/")
  @Version("1")
  @HttpCode(200)
  @ApiBody({ type: CreateProjectDto })
  @ApiTags("Create Application")
  createApplication(
    @GetCurrentUserId() merchantId: string,
    @Body()
    newApplicationData: CreateApplicationDto,
  ) {
    return this.applicationService.createApplication(
      merchantId,
      newApplicationData,
    );
  }

  @Get("/")
  @Version("1")
  @HttpCode(200)
  @ApiTags("Get Applications")
  createProject(@GetCurrentUserId() merchantId: string) {
    return this.applicationService.getApplications(
      merchantId,
    );
  }
}
