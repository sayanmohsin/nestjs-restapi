import {
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const GetCurrentUserId = createParamDecorator(
  (data: string, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    if (data) {
      return request.user[data].userId;
    }
    return request.user.userId;
  },
);
