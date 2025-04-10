import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './guards/interceptors/jwt.interceptor';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    HttpClientModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbEvaIconsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class AppModule {}
