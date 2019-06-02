import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FeedComponent } from './feed/feed.component';

const appRoutes: Routes = [
  {
    path: 'new',
    component: FeedFormComponent
  },
  {
    path: 'feed',
    component: FeedComponent
    },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FeedFormComponent,
    DashboardComponent,
    PageNotFoundComponent,
    FeedComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
