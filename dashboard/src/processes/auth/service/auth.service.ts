import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PersistanceService } from 'src/app/core/shared/services/persistance/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  constructor(
    private readonly http: HttpClient,
    private readonly persistanceService: PersistanceService,
    private readonly router: Router
  ) { }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public hasToken(): boolean {
    return this.persistanceService.get('token');
  }
}
