import { Component, OnInit } from '@angular/core';
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {Subscription} from "rxjs";
import {ScheduledDetailService} from "../../services/scheduled-detail/scheduled-detail.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss'],
})
export class DoctorDetailComponent implements OnInit {

  medicalReportList: any[] = [];
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(
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
      this.medicalReportList = response.data.medicalReport;
    });
    this.subscriptions.push(subscription);
  }

}
