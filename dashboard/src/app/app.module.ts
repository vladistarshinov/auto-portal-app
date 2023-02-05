import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ScreensRoutingModule } from './screens/screens-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/ui/layout/header/header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScreensRoutingModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
