import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsoleLogHandler } from './loggers/console-log-handler';
import { LogHandler } from './loggers/log-handler';
import { LogService } from './loggers/log.service';
import { TelemetryLogHandler } from './loggers/telemetry-log-handler';
import { RedditSearchComponent } from './reddit-search/reddit-search.component';

@NgModule({
  declarations: [AppComponent, RedditSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    LogService,
    {
      provide: LogHandler,
      useClass: ConsoleLogHandler,
      multi: true,
    },
    {
      provide: LogHandler,
      useClass: TelemetryLogHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
