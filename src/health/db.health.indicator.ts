import { Injectable } from "@nestjs/common";
import { HealthIndicatorService } from "@nestjs/terminus";
import { sql } from "drizzle-orm";
import { db } from "../index";

@Injectable()
export class DbHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  async isHealthy(key: string) {
    const indicator = this.healthIndicatorService.check(key);
    try {
      await db.execute(sql`SELECT 1`);
      return indicator.up();
    } catch (error) {
      return indicator.down({ error: String(error) });
    }
  }
}
