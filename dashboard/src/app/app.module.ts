import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesRoutingModule } from 'src/pages/pages-routing.module';
import { HeaderModule } from 'src/widgets/header/header.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
