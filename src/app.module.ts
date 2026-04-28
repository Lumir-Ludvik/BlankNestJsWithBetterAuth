import { Module } from "@nestjs/common";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { auth } from "./auth";
import { HealthModule } from "./health/health.module";
import { winstonConfig } from "./logger/winston.config";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    HealthModule,
    UsersModule,
    WinstonModule.forRoot(winstonConfig),
    AuthModule.forRoot({
      auth,
      bodyParser: {
        json: { limit: "2mb" },
        urlencoded: { limit: "2mb", extended: true },
        rawBody: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
