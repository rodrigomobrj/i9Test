import { Component, OnInit } from '@angular/core';
import {
  RiskRatings,
  SurgeryAppointmentResponseModel
} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {Subscription} from "rxjs";
import {SurgeryAppointmentsService} from "../../../shared/services/surgery-appointments/surgery-appointments.service";
import {ScheduledDetailService} from "../../services/scheduled-detail/scheduled-detail.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {

  surgeryAppointment: any;
  subscriptions: Subscription[] = [];
  patientDoRegularActivity = false;
  loading = false;

  constructor(
    private surgerySchedulingService: SurgeryAppointmentsService,
    private scheduledDetailService: ScheduledDetailService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getScheduledDetail();
  }

  ionViewWillEnter() {
    this.getScheduledDetail();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  getScheduledDetail() {
    this.loading = true;
    const subscription = this.route.params.pipe(
      switchMap(params => {
        const codeSurgery = params.id;
        return this.scheduledDetailService.getScheduledDetail(codeSurgery);
      })
    ).subscribe(response => {
      this.loading = false;
      this.surgeryAppointment = response.data;
      this.doRegularActivity(response.data.riskRatings);
    });
    this.subscriptions.push(subscription);
  }

  doRegularActivity(riskList: RiskRatings[]) {
    if(riskList.length > 0) {
      riskList.forEach(risk => {
        if (risk.description == 'Atividade fisica Regulares') {
          this.patientDoRegularActivity = true;
        }
      });
    }
  }

  getLabelStatus(status: string) {
    return this.surgerySchedulingService.getLabelStatus(status);
  }

  getColorStatus(status: string) {
    return this.surgerySchedulingService.getColorStatus(status);
  }

}
