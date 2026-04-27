import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // body parser turned off because of @nestjs-better-auth, body parser
    // is re-added in auth configuration in App.module.ts
    bodyParser: false,
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
