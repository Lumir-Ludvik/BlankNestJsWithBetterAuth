import { Logger, LoggerService } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AppModule } from "./app.module";
import { CommonExceptionFilter } from "./infrastructure/filters/commonException.filter";
import { HttpExceptionFilter } from "./infrastructure/filters/httpExceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // body parser turned off because of @nestjs-better-auth, body parser
    // is re-added in auth configuration in App.module.ts
    bodyParser: false,
    bufferLogs: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.useGlobalFilters(new CommonExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  Logger.log(`Application is running on port ${port}`, "Bootstrap");
}
void bootstrap();
