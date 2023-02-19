import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from './core/shared/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  constructor(private toastr: ToastrService, private toastService: ToastService) {
    this.toastService.isHasToast$.subscribe((data) => {
      this.toastr[data!.status](data!.summary, data!.detail, {
        closeButton: true,
        timeOut: 15000
      });
    });
  }
}
