import { Storage } from '@capacitor/storage';
import {from, Observable} from "rxjs";
import {StoreKeyEnum} from "../../../shared/enums/store-key.enum";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  getInspirationDate(): Observable<string> {
    return from(
      Storage.get({ key: StoreKeyEnum.inspirationDate })
    ).pipe(
      map(obj => obj.value)
    );
  }

  setInspirationDate(inspirationDate: string): Observable<any> {
    return from(
      Storage.set({
        key: StoreKeyEnum.inspirationDate,
        value: inspirationDate.substring(0, inspirationDate.length - 1),
      })
    );
  }

  deleteInspirationDate(): Observable<any>  {
    return from(
      Storage.remove({ key: StoreKeyEnum.inspirationDate })
    );
  }

  getToken(): Observable<string> {
    return from(
      Storage.get({ key: StoreKeyEnum.token })
    ).pipe(
      map(obj => obj.value)
    );
  }

  setToken(token: string): Promise<any> {
    return Storage.set({
      key: StoreKeyEnum.token,
      value: token,
    });
  }

  deleteToken(): Observable<any>  {
    return from(
      Storage.remove({ key: StoreKeyEnum.token })
    );
  }

  getIdUser(): Observable<string> {
    return from(
      Storage.get({ key: StoreKeyEnum.userId })
    ).pipe(
      map(obj => obj.value)
    );
  }

  setUserId(userId: string): Observable<any> {
    return from(
      Storage.set({
        key: StoreKeyEnum.userId,
        value: userId,
      })
    );
  }
}
