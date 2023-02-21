import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersistanceService } from 'src/app/core/shared/services/persistance/persistance.service';
import {finalize} from 'rxjs'
import { ToastService } from 'src/app/core/shared/services/toast/toast.service';
import { AuthService } from '../../service/auth.service';
import { IAuthResponse } from '../../service/auth.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public isShow: boolean = false;
  public loginForm!: FormGroup;
  public isLoading: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly persistanceService: PersistanceService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^.*(?=.{6,}).*$/)]),
    });
  }

  public handleShow(): void {
    this.isShow = !this.isShow;
  }


  public handleSubmit() {
    this.isLoading = true
    this.authService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data: IAuthResponse) => {
          this.persistanceService.set('userInfo', {
            email: data?.user?.email,
            firstName: data?.user?.firstName,
            lastName: data?.user?.lastName
          });
          this.persistanceService.set('accessToken', {
            accessToken: data?.accessToken
          });
          this.isShow = false;
          this.toastService.showToastr({
            status: 'success',
            summary: 'Cообщение',
            detail: 'Авторизация прошла успешно'
          });
        },
      });
  }

}
