import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { SurgeryAppointmentResponseModel } from 'src/app/shared/models/surgery-appointments/surgery-appointment-response.model';
import { environment } from 'src/environments/environment';
import { Evaluation } from '../../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private url = `${environment.api}/api`
  constructor(
    private http: HttpClient
  ) { }

  sendSurgeryEvaluation(surgeryId, evaluation) : Observable<Evaluation>{
    const endPoint = `${this.url}/surgery-appointments/${surgeryId}/assess-performed-surgery`;
    return this.http.post<Evaluation>(endPoint, evaluation);
  }

  getSurgeryId() : Observable<ResponseModel<SurgeryAppointmentResponseModel>> {
    const endPoint = `${this.url}/locate-surgery-performed-to-assess`;
    return this.http.get<ResponseModel<SurgeryAppointmentResponseModel>>(endPoint)
  }
}
