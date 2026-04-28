import { Logger, LoggerService } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionsFilter());
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Application is running on port ${port}`, "Bootstrap");
}
void bootstrap();
