import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const validationMessages =
      exception instanceof BadRequestException
        ? exception["response"]["message"]
        : [];

    const responseBody = {
      statusCode: httpStatus,
      message: exception["message"] ?? "",
      validationMessages,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      httpStatus,
    );
  }
}
