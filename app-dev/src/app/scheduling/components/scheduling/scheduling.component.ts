import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {TimetablesService} from "../../service/timetables.service";
import {parseDateToBackUtil} from "../../../shared/utils/parseDateToBackUtil";
import {switchMap} from "rxjs/operators";
import {Observable, of, Subscription} from "rxjs";
import {AppointmentHoursModel} from "../../../shared/models/appointment-hours.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SurgeryAppointmentsService} from "../../../shared/services/surgery-appointments/surgery-appointments.service";
import {schedulingEnum} from "../../enum/scheduling.enum";
import {SchedulingLocalStorageService} from "../../../shared/services/local-storage/face-to-face-scheduling-local-storage/scheduling-local-storage.service";
import {ScheduledPerformedLocalStorageService} from "../../../shared/services/local-storage/scheduled-performed-surgeries-local-storage/scheduled-performed-local-storage.service";
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {dateSchedulingValidator} from "../../../shared/validators/date-scheduling.validator";
import {
  isTouchedAndInvalidUtil,
  isTouchedAndInvalidUtilFormControl
} from "../../../shared/utils/isTouchedAndInvalid.util";

@Component({
  selector: 'app-online-consultation',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent implements OnInit, OnDestroy {

  dateControl = new FormControl('', dateSchedulingValidator);
  subscriptions: Subscription[] = [];
  surgeryCode: string;
  profileCode: string;
  typeProfile: 'hospitals' | 'surgeons';
  showModal = false;
  disabledLoginButton = false;
  hourValue: AppointmentHoursModel;
  hourList: AppointmentHoursModel[] = [];
  hourIsValid = false;
  typeScheduling = 'scheduling';
  title: string;
  schedulingEnum = schedulingEnum;
  textModal = '';
  haveTime = true;
  parseDateToBackUtil = parseDateToBackUtil;
  surgeryAppointment: SurgeryAppointmentResponseModel;

  constructor(
    private fb: FormBuilder,
    private surgeonTimetablesService: TimetablesService,
    private route: ActivatedRoute,
    private router: Router,
    private surgeryAppointmentsService: SurgeryAppointmentsService,
    private schedulingLocalStorageService: SchedulingLocalStorageService,
    private scheduledPerformedLocalStorageService: ScheduledPerformedLocalStorageService
  ) { }

  ngOnInit() {
    this.getHours();
    this.getIdProcedure();
    this.getTypeScheduling();
    this.getTitle();
    this.getTextModal();
    this.getSurgeryAppointment();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  getSurgeryAppointment() {
    this.scheduledPerformedLocalStorageService.getSurgery().subscribe(surgeryAppointment => {
      this.surgeryAppointment = surgeryAppointment;
    });
  }

  getTitle() {
    if (this.typeScheduling == this.schedulingEnum.online)
      this.title = 'AGENDE SUA CONSULTA ONLINE';
    if (this.typeScheduling == this.schedulingEnum.facetoface)
      this.title = 'AGENDE SUA CONSULTA PRESENCIAL';
    if (this.typeScheduling == this.schedulingEnum.surgery)
      this.title = 'AGENDE SUA CIRURGIA';
  }

  getTextModal() {
    if (this.typeScheduling == this.schedulingEnum.online)
      this.textModal = 'Você está agendando a consulta online para a seguinte data:';
    if (this.typeScheduling == this.schedulingEnum.facetoface)
      this.textModal = 'Você está agendando a consulta presencial para a seguinte data:';
    if (this.typeScheduling == this.schedulingEnum.surgery)
      this.textModal = 'Você está agendando a cirurgia para a seguinte data:';
  }

  getTypeScheduling() {
    this.typeScheduling = this.route.snapshot.url[0].path;
  }

  getIdProcedure() {
    const subscription = this.route.params.subscribe(params => {
      this.surgeryCode = params['surgeryCode'];
      this.profileCode = params['profileCode'];
      this.typeProfile = params['typeProfile'];
    });
    this.subscriptions.push(subscription);
  }

  getHours() {
    const subscription = this.dateControl.statusChanges.pipe(
      switchMap(status => {
        if (status == 'VALID') {
          this.disabledLoginButton = true;
          const date = parseDateToBackUtil(this.dateControl.value);
          return this.getService(date);
        } else {
          this.hourList = [];
          return of(null);
        }
      })
    ).subscribe(
      response => {
        if (response) {
          this.disabledLoginButton = false;
          this.hourList = response.data;
          this.haveTime = true;
          if (this.hourList.length == 0) {
            this.haveTime = false;
          }
        }
      },
      error => {
        this.disabledLoginButton = false;
      }
    );
    this.subscriptions.push(subscription);
  }

  getService(date: string): Observable<any> {
    if (this.typeScheduling == this.schedulingEnum.online)
      return this.surgeonTimetablesService.getOnlineHours(date);
    if (this.typeScheduling == this.schedulingEnum.facetoface)
      return this.surgeonTimetablesService.getFaceToFaceHours(this.typeProfile, date, this.profileCode);
    if (this.typeScheduling == this.schedulingEnum.surgery)
      return this.surgeonTimetablesService.getSurgeryHours(
        date,
        this.surgeryAppointment.hospital.code,
      );
  }

  hourIsValidEvent(isValid: boolean) {
    this.hourIsValid = isValid;
  }

  hourValueChanges(valueSelected) {
    this.hourValue = valueSelected;
  }

  openModal() {
    this.showModal = true;
  }

  sendHour() {
    if (this.typeScheduling == this.schedulingEnum.online) {
      this.sendHourOnline();
    }
    if (this.typeScheduling == this.schedulingEnum.facetoface) {
      this.sendHourFacetoface();
    }
    if (this.typeScheduling == this.schedulingEnum.surgery) {
      this.sendHourSurgery();
    }
  }

  sendHourOnline() {
    const payload = {
      code: this.surgeryCode,
      step: 'main/scheduling-facetoface-consultations',
      scheduleDate: this.parseDateToBackUtil(this.dateControl.value),
      timetableCode: this.hourValue.code,
    };
    const subscription = this.surgeonTimetablesService.saveOnlineScheduling(payload).subscribe(() => {
      this.router.navigate(['main/scheduled-performed-surgeries']).then();
    });
    this.subscriptions.push(subscription);
  }

  sendHourFacetoface() {
    const payload = {
      profileCode: this.profileCode,
      dateRef: this.parseDateToBackUtil(this.dateControl.value),
      timetableCode: this.hourValue.code,
      typeProfile: this.typeProfile,
      surgeryAppointmentCode: this.surgeryAppointment.code,
    };
    const subscription = this.schedulingLocalStorageService.setSurgery(payload).subscribe(() => {
      this.router.navigate(['main/payments/home/appointments']).then();
    });
    this.subscriptions.push(subscription);
  }

  sendHourSurgery() {
    const payload = {
      code: this.surgeryAppointment.code,
      timetableCode: this.hourValue.code,
      scheduleDate: this.parseDateToBackUtil(this.dateControl.value),
      hospitalCode: this.surgeryAppointment.hospital.code,
      step: 'falta implementar o step a seguir', // falta implementar o step a seguir
    }
    const subscription = this.schedulingLocalStorageService.setSurgery(payload).subscribe(() => {
      this.router.navigate(['main/payments/home/surgery']).then();
    });
    this.subscriptions.push(subscription);
  }

  isTouchedAndInvalid() {
    return isTouchedAndInvalidUtilFormControl(this.dateControl);
  }
}
