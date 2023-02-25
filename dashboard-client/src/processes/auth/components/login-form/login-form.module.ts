import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { LoadingModule } from '@/shared/ui/loading/loading.module';

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    LoadingModule,
  ],
  exports: [
    LoginFormComponent,
  ]
})
export class LoginFormModule {
}
