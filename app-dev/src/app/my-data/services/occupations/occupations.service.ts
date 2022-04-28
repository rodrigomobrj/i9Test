import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResponseModel} from "../../../shared/models/response.model";
import {ResponseListModel} from "../../../shared/models/ResponseList.model";
import {OccupationModel} from "../../model/occupation.model";

@Injectable({
  providedIn: 'root'
})
export class OccupationsService {

  url = `${environment.api}/api/occupations`

  constructor(
    private http: HttpClient,
  ) { }

  getAllOccupation(occupation: string): Observable<ResponseModel<ResponseListModel<OccupationModel[]>>> {
    return this.http.get<ResponseModel<ResponseListModel<OccupationModel[]>>>(this.url + '?description=' + occupation);
  }
}
