import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastService } from 'src/app/core/shared/services/toast/toast.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public isShow: boolean = false;
  public loginForm!: FormGroup;
  public isLoading: boolean = false;
  constructor(private toastService: ToastService) {}

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
    //this.isLoading = true
    console.log(this.loginForm.value)
    this.toastService.showToastr({
      status: 'success',
      summary: 'Cообшение',
      detail: 'Авторизация прошла успешно',
    });
  }

}
