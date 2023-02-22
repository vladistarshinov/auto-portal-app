import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanDeactivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

import { AuthService } from '@/processes/auth/service/auth.service';
import { PersistanceService } from '../shared/services/persistance/persistance.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly persistenceService: PersistanceService,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.hasToken()) {
            this.router.navigate(['403'], { skipLocationChange: true });
            return of(false);
        }
        return of(true);
    }

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.persistenceService.remove('token');
        return true;
    }
}
