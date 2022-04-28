import { ResponseListModel } from './../../shared/models/ResponseList.model';
import { AttachmentModel } from './../models/appointments.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { RiskRating } from '../models/riskRating.model';
import { Appointments } from '../models/appointments.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MedicationListModel } from 'src/app/shared/models/medication.model';
import { AllergyListModel } from 'src/app/shared/models/allergie.model';
import { SurgeryAppointmentResponseModel } from 'src/app/shared/models/surgery-appointments/surgery-appointment-response.model';

@Injectable()
export class RiskRatingsService {

  private url = `${environment.api}`;

  constructor(private http: HttpClient) { }

  getMedications(): Observable<ResponseModel<MedicationListModel>> {
    return this.http.get<ResponseModel<MedicationListModel>>(`${this.url}/api/medications`)
  }

  getAllergies(): Observable<ResponseModel<AllergyListModel>> {
    return this.http.get<ResponseModel<AllergyListModel>>(`${this.url}/api/allergies`)
  }

  getRiskRatings() : Observable<ResponseModel<RiskRating[]>>{
    const endPoint = `${this.url}/api/risk-ratings`
    return this.http.get<ResponseModel<RiskRating[]>>(endPoint);
  }

  getAppointments(code: string) : Observable<ResponseModel<ResponseListModel<SurgeryAppointmentResponseModel[]>>> {
    const endPoint = `${this.url}/api/surgery-appointments/${code}`;
    return this.http.get<ResponseModel<ResponseListModel<SurgeryAppointmentResponseModel[]>>>(endPoint);
  }

  getFilesUploaded(code: string): Observable<ResponseModel<AttachmentModel>> {
    const endpoint = `${this.url}/api/patient-surgery-attachment/${code}`
    return this.http.get<ResponseModel<AttachmentModel>>(endpoint);
  }

  updateAppointments(data: Appointments) : Observable<ResponseModel<string>> {
    const endPoint = `${this.url}/api/surgery-appointments`;
    return this.http.patch<ResponseModel<string>>(endPoint, data);
  }

  createAppointments(data: Appointments) : Observable<ResponseModel<string>> {
    const endPoint = `${this.url}/api/surgery-appointments`;
    return this.http.post<ResponseModel<string>>(endPoint, data);
  }

}
