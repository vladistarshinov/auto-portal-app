import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  isHasToast$ = new BehaviorSubject<{ status: 'success' | 'error', summary: string, detail: string } | null>(null);
  constructor() { }

  showToastr(data: { status: 'success' | 'error', summary: string, detail: string }): void {
    this.isHasToast$.next(data);
  }
}
