import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const loggerWinston = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // winston.format.json(),
    winston.format.splat(),
    winston.format.prettyPrint(),
    winston.format.label({ label: 'Smartedu' }),
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/server_error.log',
      level: 'error',
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  exitOnError: false,
});

export { loggerWinston };
