import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public isShow: boolean = false;
  constructor() {}

  ngOnInit(): void {
  }

  public handleShow(): void {
    this.isShow = !this.isShow;
  }

  public handleSubmit() {

  }

}
