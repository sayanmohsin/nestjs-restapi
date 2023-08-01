import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
} from "@nestjs/core";
import { AllExceptionFilter } from "./shared/exceptions/allException.filter";
import { AuthModule } from "./auth/auth.module";
import { LoggerModule } from "nestjs-pino";
// import { Database, Resource } from "@adminjs/prisma";
// import { AdminModule } from "@adminjs/nestjs";
// import { DMMFClass } from "@prisma/client/runtime";
import AdminJS from "adminjs";
import { RolesGuard } from "./auth/guards/roles.guard";
import { MerchantAuthGuard } from "./auth/guards";
import { UserModule } from "./user/userModule";
import {
  IsIdExistConstraint,
  IsUniqueConstraint,
  IsUniqueMerchantEmailConstraint,
} from "./shared/validators";
import { ProjectModule } from "./project/project.module";
import { HealthModule } from "./health/health.module";
import {
  ThrottlerGuard,
  ThrottlerModule,
} from "@nestjs/throttler";
import { TransformInterceptor } from "./shared/interceptor";

// AdminJS.registerAdapter({ Resource, Database });

const DEFAULT_ADMIN = {
  email: "admin@tetrfy.com",
  password: "password",
};

const authenticate = async (
  email: string,
  password: string,
) => {
  if (
    email === DEFAULT_ADMIN.email &&
    password === DEFAULT_ADMIN.password
  ) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 500,
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UserModule,
    ProjectModule,
    // AdminModule.createAdminAsync({
    //   imports: [PrismaModule],
    //   inject: [PrismaService],
    //   useFactory: (prisma: PrismaService) => {
    //     const dmmf = (prisma as any)._baseDmmf as DMMFClass;
    //     return {
    //       adminJsOptions: {
    //         rootPath: "/admin",
    //         resources: [
    //           {
    //             resource: {
    //               model: dmmf.modelMap.User,
    //               client: prisma,
    //             },
    //             options: {
    //               id: "User",
    //             },
    //           },
    //           {
    //             resource: {
    //               model: dmmf.modelMap.Industry,
    //               client: prisma,
    //             },
    //             options: {
    //               id: "Industry",
    //             },
    //           },
    //           {
    //             resource: {
    //               model: dmmf.modelMap.Company,
    //               client: prisma,
    //             },
    //             options: {
    //               id: "Company",
    //             },
    //           },
    //         ],
    //       },
    //       auth: {
    //         authenticate,
    //         cookieName: "adminjs",
    //         cookiePassword: "secret",
    //       },
    //       sessionOptions: {
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: "secret",
    //       },
    //     };
    //   },
    // }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: MerchantAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    IsUniqueConstraint,
    IsIdExistConstraint,
    IsUniqueMerchantEmailConstraint,
  ],
})
export class AppModule {}
