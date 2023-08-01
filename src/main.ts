import { NestFactory } from "@nestjs/core";
import { AppModule } from "./appModule";
import {
  SwaggerModule,
  DocumentBuilder,
} from "@nestjs/swagger";
import {
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import {
  Logger,
  LoggerErrorInterceptor,
} from "nestjs-pino";
import { writeFile } from "fs/promises";
import helmet from "helmet";
import { stringify as ymlStringify } from "yaml";
import { useContainer } from "class-validator";
import * as compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
          ],
          styleSrc: ["'self'", "https:", "'unsafe-inline'"],
          baseUri: ["'self'"],
          fontSrc: ["'self'", "https:", "data:"],
        },
      },
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({ transform: true }),
  );
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Tetrfy")
    .setDescription("API description")
    .setVersion("1.0")
    .addTag("API Modules")
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  writeFile(
    "./public/openapi-spec.yml",
    ymlStringify(document),
  );
  SwaggerModule.setup("api", app, document);

  await app.listen(3333);
}
bootstrap();
