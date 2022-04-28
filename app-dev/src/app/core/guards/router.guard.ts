import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication/authentication.service";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.getInspirationDate().pipe(
      map(inspirationDateString => {
        if (!inspirationDateString) {
          this.router.navigate(['']).then();
          return false;
        }
        const inspirationDate = new Date(inspirationDateString);
        const now = new Date().toUTCString();
        const nowUTC = new Date(now.substring(0, 25));
        if (inspirationDate <= nowUTC) {
          this.router.navigate(['']).then();
          return false;
        }
        return true;
      })
    );
  }

}
