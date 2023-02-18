import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LoginFormModule } from 'src/processes/auth/components/login-form/login-form.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LoginFormModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
