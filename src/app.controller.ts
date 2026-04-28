import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new Error(
      "This is a test error to demonstrate logging and error handling.",
    );
    return this.appService.getHello();
  }
}
