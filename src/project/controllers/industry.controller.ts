import {
  HttpCode,
  Controller,
  Version,
  Get,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IndustryService } from "../services";
import { Public } from "../../auth/decorators";
import { NotFoundInterceptor } from "../../shared/interceptor";

@ApiTags("Industry")
@Controller("industries")
export class IndustryController {
  constructor(
    private readonly industryService: IndustryService,
  ) {}

  @Public()
  @Get("/")
  @Version("1")
  @HttpCode(200)
  @ApiTags("Get industries")
  @UseInterceptors(
    new NotFoundInterceptor("Industries not found"),
  )
  getIndustries() {
    return this.industryService.getIndustries();
  }
}
