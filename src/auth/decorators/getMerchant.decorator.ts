import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const GetMerchant = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
