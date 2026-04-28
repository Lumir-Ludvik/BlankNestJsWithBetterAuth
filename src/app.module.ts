import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { winstonConfig } from "./logger/winston.config";

@Module({
  imports: [HealthModule, WinstonModule.forRoot(winstonConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
