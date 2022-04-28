import { Component, OnInit } from '@angular/core';
import {SurgeryAppointmentsService} from "../../../shared/services/surgery-appointments/surgery-appointments.service";
import {parseDateToBackUtil} from "../../../shared/utils/parseDateToBackUtil";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-online-scheduling',
  templateUrl: './online-scheduling.component.html',
  styleUrls: ['./online-scheduling.component.scss'],
})
export class OnlineSchedulingComponent implements OnInit {

  payload;
  idProcedure: string;
  subscriptions: Subscription[] = [];

  constructor(
    private surgeryAppointmentsService: SurgeryAppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getIdProcedure();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getIdProcedure() {
    const subscription = this.route.params.subscribe(params => {
      this.idProcedure = params['id'];
    });
    this.subscriptions.push(subscription);
  }

  changeValue(value) {
    this.payload = {
      code: this.idProcedure,
      step: 'main/scheduling-facetoface-consultations',
      scheduleDate: value.date,
      timetableCode: value.hourCode,
    };
  }

  sendHour() {
    this.surgeryAppointmentsService.updateAppointments(this.payload).subscribe(() => {
      this.router.navigate(['main/scheduled-performed-surgeries']).then();
    });
  }

}
