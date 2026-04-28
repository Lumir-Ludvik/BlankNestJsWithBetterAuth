import { Module } from "@nestjs/common";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_TOKEN } from "./database.tokens";

@Module({
  providers: [
    {
      provide: DATABASE_TOKEN,
      useFactory: (): NodePgDatabase =>
        drizzle({
          connection: {
            connectionString: process.env.DATABASE_URL!,
            ssl: process.env.NODE_ENV === "production",
          },
        }),
    },
  ],
  exports: [DATABASE_TOKEN],
})
export class DatabaseModule {}
