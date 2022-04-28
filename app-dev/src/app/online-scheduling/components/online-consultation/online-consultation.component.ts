import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {dateValidator} from "../../../shared/validators/date";
import {SurgeonTimetablesService} from "../../service/surgeon-timetables.service";
import {parseDateToBackUtil} from "../../../shared/utils/parseDateToBackUtil";
import {switchMap} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {AppointmentHoursModel} from "../../../shared/models/appointment-hours.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SurgeryAppointmentsService} from "../../../shared/services/surgery-appointments/surgery-appointments.service";
import {Appointments} from "../../../risk-classification/models/appointments.model";

@Component({
  selector: 'app-online-consultation',
  templateUrl: './online-consultation.component.html',
  styleUrls: ['./online-consultation.component.scss'],
})
export class OnlineConsultationComponent implements OnInit, OnDestroy {

  dateControl = new FormControl('', dateValidator);
  form: FormGroup = this.fb.group({
    hourList: this.fb.array([], this.validatingSelectedTime),
  });
  subscriptions: Subscription[] = [];
  idProcedure: string;
  showModal = false;
  payload: Appointments;
  disabledLoginButton = false;

  constructor(
    private fb: FormBuilder,
    private surgeonTimetablesService: SurgeonTimetablesService,
    private route: ActivatedRoute,
    private router: Router,
    private surgeryAppointmentsService: SurgeryAppointmentsService,
  ) { }

  ngOnInit() {
    this.getHours();
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

  getHours() {
    const subscription = this.dateControl.statusChanges.pipe(
      switchMap(status => {
        if (status == 'VALID') {
          this.disabledLoginButton = true;
          const date = parseDateToBackUtil(this.dateControl.value);
          return this.surgeonTimetablesService.getHours(date);
        }
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        this.disabledLoginButton = false;
        this.resetTagHour();
        this.createTagHour(response.data);
      }
    });
    this.subscriptions.push(subscription);
  }

  resetTagHour() {
    this.form = this.fb.group({
      hourList: this.fb.array([], {validators: this.validatingSelectedTime}),
    });
  }

  validatingSelectedTime(formArray: FormArray): { [s: string]: boolean } {
    const formArrayValue = formArray.getRawValue();
    let isValid = false;
    formArrayValue.forEach(value => {
      if (value.boolean)
        isValid = true;
    });
    return isValid ? null : {noAppointment: true};
  }

  createTagHour(hourList: AppointmentHoursModel[]) {
    hourList.forEach(hour => {
      (this.form.get('hourList') as FormArray).push(
        this.fb.group({
          hour: [hour],
          boolean: [false],
        })
      );
    });
  }

  falseInAllLabel(index: number) {
    (this.form.get('hourList') as FormArray)['controls'].forEach((formGroup, indexFormGroup) => {
      if (index != indexFormGroup) {
        formGroup.get('boolean').setValue(false);
      }
    });
  }

  openModal() {
    this.payload = {
      code: this.idProcedure,
      step: 'main/scheduling-facetoface-consultations',
      scheduleDate: parseDateToBackUtil(this.dateControl.value),
      timetableCode: this.getHourSelected().code,
    };
    this.showModal = true;
  }

  sendHour() {
    this.surgeryAppointmentsService.updateAppointments(this.payload).subscribe(() => {
      this.router.navigate(['main/scheduled-performed-surgeries']).then();
    });
  }

  getHourSelected(): AppointmentHoursModel {
    const formValue = this.form.getRawValue();
    const hourSelected = formValue.hourList.filter(value => {
      if (value.boolean)
        return value;
    })[0];
    if (hourSelected)
      return hourSelected.hour
    return null;
  }
}
