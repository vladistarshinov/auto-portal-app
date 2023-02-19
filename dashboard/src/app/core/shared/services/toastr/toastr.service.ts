import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  isHasToast$ = new BehaviorSubject<any>(null);
  constructor() { }

  showToastr(data: any): void {
    this.isHasToast$.next(data);
  }
}
