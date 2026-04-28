import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CommonExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request<object, object, unknown>>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const logContext = {
      method: request.method,
      url: request.url,
      statusCode: status,
      body: request.body,
    };

    const message = `Internal server error ${exception.message}`;

    this.logger.error(message, exception.stack, JSON.stringify(logContext));

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
