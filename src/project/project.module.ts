import { Module } from "@nestjs/common";
import {
  ProjectController,
  IndustryController,
  ApplicationController,
} from "./controllers";
import {
  IndustryService,
  ProjectService,
} from "./services";
import { UserModule } from "../user/userModule";
import { CompanyService } from "../user/services";
import { ApplicationService } from "./services/application.service";

@Module({
  imports: [UserModule],
  providers: [
    ProjectService,
    CompanyService,
    IndustryService,
    ApplicationService,
  ],
  controllers: [
    ProjectController,
    IndustryController,
    ApplicationController,
  ],
})
export class ProjectModule {
  constructor() {}
}
