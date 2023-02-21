import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPayloadToastData } from './toast.type';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public isHasToast$ = new BehaviorSubject<IPayloadToastData>(null);
  constructor() { }

  showToastr(data: IPayloadToastData): void {
    this.isHasToast$.next(data);
  }
}
