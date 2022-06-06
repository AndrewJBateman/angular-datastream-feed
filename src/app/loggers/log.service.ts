import { Inject, Injectable } from '@angular/core';

import { LogHandler } from './log-handler';

@Injectable()
export class LogService {
  constructor(@Inject(LogHandler) private loggers: LogHandler[]) {}
  log(message: string) {
    this.loggers.forEach(logger => logger.log(message));
  }
}