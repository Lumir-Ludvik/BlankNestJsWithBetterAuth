import { Controller, Get } from "@nestjs/common";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { auth } from "../auth";

@Controller("users")
export class UsersController {
  @Get("me")
  me(@Session() session: UserSession<typeof auth>) {
    return session.user;
  }
}
