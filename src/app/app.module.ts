import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ComponentModule } from './components/component.module';

import { DataService } from './services/data.service';
import { GoodsService } from "./services/goods.service";

import { RequestsLogInterceptor } from "./interceptors/requests-log.interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestsLogInterceptor, multi: true },
  ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    BrowserAnimationsModule
  ],
  providers: [httpInterceptorProviders, DataService, GoodsService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
