import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ResponseModel} from "../../models/response.model";
import {ResponseListModel} from "../../models/ResponseList.model";
import {SurgeryAppointmentResponseModel} from "../../models/surgery-appointments/surgery-appointment-response.model";
import {StatusEnum} from "../../../scheduled-performed-surgeries/enums/status.enum";
import {Appointments} from "../../../risk-classification/models/appointments.model";

@Injectable({
  providedIn: 'root'
})
export class SurgeryAppointmentsService {

  url = `${environment.api}/api/surgery-appointments`

  constructor(
    private http: HttpClient,
  ) { }

  getSurgeryScheduling(): Observable<ResponseModel<ResponseListModel<SurgeryAppointmentResponseModel[]>>> {
    return this.http.get<any>(this.url);
  }

  updateAppointments(data: Appointments) : Observable<ResponseModel<string>> {
    return this.http.patch<ResponseModel<string>>(this.url, data);
  }

  createAppointments(data: Appointments) : Observable<ResponseModel<string>> {
    return this.http.post<ResponseModel<string>>(this.url, data);
  }

  getLabelStatus(status: string): string {
    switch (status) {
      case StatusEnum.stepOne :
        return 'Pendente informações';
      case StatusEnum.stepTwo :
        return 'Aguardando agendamento de consulta online';
      case StatusEnum.stepThree :
        return 'Consulta online agendada';
      case StatusEnum.stepFour :
        return 'Consulta online realizada';
      case StatusEnum.stepFive :
        return 'Aguardando agendamento de consulta presencial';
      case StatusEnum.stepSix :
        return 'Consulta presencial agendada';
      case StatusEnum.stepSeven :
        return 'Consulta presencial realizada';
      case StatusEnum.stepEight :
        return 'Agendar cirurgia';
      case StatusEnum.stepNine :
        return 'Cirurgia Agendada';
      case StatusEnum.stepTen :
        return 'Cirurgia realizada';
      case StatusEnum.stepEleven :
        return 'Consulta pós-operatória agendada';
      case StatusEnum.stepTwelve :
        return 'Finalizada';
      case StatusEnum.stepThirteen :
        return 'Aguardando confirmação do pagamento';
    }
  }

  getColorStatus(status: string): 'purple' | 'green' | 'blue' {
    switch (status) {
      case StatusEnum.stepOne :
        return 'purple';
      case StatusEnum.stepTwo :
        return 'purple';
      case StatusEnum.stepThree :
        return 'green';
      case StatusEnum.stepFour :
        return 'blue';
      case StatusEnum.stepFive :
        return 'purple';
      case StatusEnum.stepSix :
        return 'green';
      case StatusEnum.stepSeven :
        return 'purple';
      case StatusEnum.stepEight :
        return 'purple';
      case StatusEnum.stepNine :
        return 'green';
      case StatusEnum.stepTen :
        return 'blue';
      case StatusEnum.stepTwelve :
        return 'green';
      case StatusEnum.stepEleven :
        return 'blue';
      case StatusEnum.stepThirteen :
        return 'green';
    }
  }
}
