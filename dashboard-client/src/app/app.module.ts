import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PersistanceService } from './core/shared/services/persistance/persistance.service';
import { PagesRoutingModule } from '@/pages/pages-routing.module';
import { HeaderModule } from '@/widgets/header/header.module';
import { ToastService } from './core/shared/services/toast/toast.service';
import { LayoutModule } from '@/widgets/layout/layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    HeaderModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    PersistanceService,
    ToastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
