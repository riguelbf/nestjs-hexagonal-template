import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { json } from 'stream/consumers';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const BAD_REQUEST = (statusCode: number) =>
      statusCode >= 400 && statusCode <= 499;

    this.logger.debug(
      `${req.originalUrl} \n - ${JSON.stringify(
        req.headers,
        null,
        2,
      )} \n ${JSON.stringify(req.body, null, 2)}`,
    );

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const logMessage = `[${req.method}] ${req.url} - ${statusCode}`;

      if (BAD_REQUEST(statusCode)) {
        this.logger.warn(logMessage);
      }
    });

    next();
  }
}
