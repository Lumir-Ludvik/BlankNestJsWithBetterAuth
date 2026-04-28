import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { DatabaseModule } from "../database/database.module";
import { HealthController } from "./health.controller";
import { DbHealthIndicator } from "./db.health.indicator";

@Module({
  imports: [TerminusModule, DatabaseModule],
  controllers: [HealthController],
  providers: [DbHealthIndicator],
})
export class HealthModule {}
