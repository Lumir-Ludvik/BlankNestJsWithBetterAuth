import { Controller, Get } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { DbHealthIndicator } from "./db.health.indicator";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private db: DbHealthIndicator,
  ) {}

  @AllowAnonymous()
  @Get("liveness")
  @HealthCheck()
  liveness() {
    return this.health.check([
      () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
    ]);
  }

  @AllowAnonymous()
  @Get("readiness")
  @HealthCheck()
  readiness() {
    return this.health.check([
      () => this.db.isHealthy("database"),
      () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
      () => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024),
      () =>
        this.disk.checkStorage("disk", {
          path: "/",
          thresholdPercent: 0.9,
        }),
    ]);
  }
}
