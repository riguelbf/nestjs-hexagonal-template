import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const LoggerWinston = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
    winston.format.splat(),
    winston.format.prettyPrint(),
    winston.format.label({ label: 'z-place' }),
  ),
  transports: [
    // file on daily rotation (error only)
    new winston.transports.DailyRotateFile({
      // %DATE will be replaced by the current date
      filename: `logs/%DATE%-error.log`,
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false, // don't want to zip our logs
      maxFiles: '30d', // will keep log until they are older than 30 days
    }),
    // same for all levels
    new winston.transports.DailyRotateFile({
      filename: `logs/%DATE%-combined.log`,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '30d',
    }),
    new winston.transports.Console({
      level: 'debug',
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
    new winston.transports.DailyRotateFile({
      filename: `logs/%DATE%-exceptions.log`,
    }),
  ],
  exitOnError: false,
});

export { LoggerWinston };
