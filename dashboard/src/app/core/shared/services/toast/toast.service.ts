import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type IPayloadToastData = {
  status: 'success' | 'error' | 'info';
  summary: string;
  detail: string;
} | null;

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  isHasToast$ = new BehaviorSubject<IPayloadToastData>(null);
  constructor() { }

  showToastr(data: IPayloadToastData): void {
    this.isHasToast$.next(data);
  }
}
