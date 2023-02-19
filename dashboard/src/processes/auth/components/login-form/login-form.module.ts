import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'src/shared/ui/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
