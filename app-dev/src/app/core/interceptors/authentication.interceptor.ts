import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication/authentication.service";
import {mergeMap} from "rxjs/operators";
import {ConnectionStatus, Network} from '@capacitor/network';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(Network.getStatus()).pipe(
      mergeMap((network: ConnectionStatus) => {
        if (!network.connected) {
          this.snackBar.open('Necessário conexão com a internet para usar o aplicativo', 'Ok');
        }
        return this.authenticationService.getToken();
      }),
      mergeMap(token => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(request);
      })
    )
  }
}
