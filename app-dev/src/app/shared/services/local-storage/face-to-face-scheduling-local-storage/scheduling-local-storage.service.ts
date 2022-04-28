import { Injectable } from '@angular/core';
import {from, Observable} from "rxjs";
import {Storage} from "@capacitor/storage";
import {StoreKeyEnum} from "../../../enums/store-key.enum";
import {map} from "rxjs/operators";
import {FaceToFaceSchedulingModel} from "../../../../scheduling/model/face-to-face-scheduling.model";

@Injectable({
  providedIn: 'root'
})
export class SchedulingLocalStorageService {

  setSurgery(faceToFaceScheduling: any): Observable<any> {
    return from(
      Storage.set({
        key: StoreKeyEnum.scheduling,
        value: JSON.stringify(faceToFaceScheduling),
      })
    );
  }

  getSurgery(): Observable<any> {
    return from(
      Storage.get({ key: StoreKeyEnum.scheduling })
    ).pipe(
      map(obj => JSON.parse(obj.value))
    );
  }
}
