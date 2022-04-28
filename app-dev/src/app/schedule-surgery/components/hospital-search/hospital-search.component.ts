import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ScheduledPerformedLocalStorageService } from 'src/app/shared/services/local-storage/scheduled-performed-surgeries-local-storage/scheduled-performed-local-storage.service';
import { SchedulingSurgeryService } from '../../services/scheduling-surgery.service';
import { HospitalScheduling } from '../../models/hospital-scheduling.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { parseDateToBackUtil } from 'src/app/shared/utils/parseDateToBackUtil';
import {dateSchedulingValidator} from "../../../shared/validators/date-scheduling.validator";
import {AppointmentHoursModel} from "../../../shared/models/appointment-hours.model";
import {HospitalSearchModel} from "../../models/hospital-search.model";
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {SchedulingLocalStorageService} from "../../../shared/services/local-storage/face-to-face-scheduling-local-storage/scheduling-local-storage.service";

@Component({
  selector: 'app-hospital-search',
  templateUrl: './hospital-search.component.html',
  styleUrls: ['./hospital-search.component.scss'],
})
export class HospitalSearchComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  surgeryTimes: AppointmentHoursModel[] = [];
  loading: boolean = false;
  showFilter: boolean = true;
  hospitals: HospitalScheduling[] = [];
  surgeonId: string;
  hospitalId: string;
  date: string;
  parseDateToBackUtil = parseDateToBackUtil;
  dateSearch: any;
  surgeryAppointment: SurgeryAppointmentResponseModel;

  constructor(
    private fb: FormBuilder,
    private schedulingLocalStorageService: SchedulingLocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private scheduleSurgery: SchedulingSurgeryService,
    private snackBar: MatSnackBar,
    private scheduledPerformedLocalStorageService: ScheduledPerformedLocalStorageService
  ) { }

  ngOnInit() {
    this.getSurgeonCode();
    this.createForm();
    this.searchHospitals();
    this.getSurgeryTimes();
    this.getSurgeryAppointment();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }

  getSurgeonCode() {
    const subscription = this.route.params.subscribe(
      params => {
        this.surgeonId = params['surgeonId'];
      }
    )
    this.subscriptions.push(subscription);
  }

  getSurgeryAppointment() {
    this.scheduledPerformedLocalStorageService.getSurgery().subscribe(surgeryAppointment => {
      this.surgeryAppointment = surgeryAppointment;
    });
  }

  createForm() {
    this.form = this.fb.group({
      hospitalName:[''],
      surgeryDate: ['', dateSchedulingValidator],
      surgeryTime: ['', Validators.required],
      bestRating: [false]
    })
  }

  getSurgeryTimes() {
    const subscription = this.form.get('surgeryDate').statusChanges.pipe(
      switchMap(status => {
        if (status == 'VALID') {
          this.dateSearch = this.parseDateToBackUtil(this.form.get('surgeryDate').value);
          return this.scheduleSurgery.getSurgeryTime(this.surgeonId, this.dateSearch);
        } else {
          return of(null);
        }
      })
    ).subscribe(response => {
      if (response) {
        this.surgeryTimes = response.data;
      }
    });
    this.subscriptions.push(subscription);
  }

  searchHospitals() {
    const subscription = this.form.valueChanges.pipe(
      debounceTime(1000),
      switchMap(formValue => {
        const searchObj = this.createSearchObj(formValue);
        if(this.form.valid) {
          this.loading = true;
          return this.scheduleSurgery.searchHospitalsForSurgeon(searchObj)
        } else {
          return of(null);
        }
      })
    ).subscribe(response => {
      this.loading = false;
      if(response) {
        this.hospitals = response.data;
      }
    },
    (err) => {
      this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000})
      this.loading = false;
    })
    this.subscriptions.push(subscription);
  }

  createSearchObj(formValue): HospitalSearchModel {
    return {
      hospitalName: formValue.hospitalName,
      dateRef: this.parseDateToBackUtil(formValue.surgeryDate),
      timetableCode: formValue.surgeryTime,
      surgeonCode: this.surgeonId,
      bestRating: formValue.bestRating,
    }
  }

  showFilterMethod() {
    this.showFilter = !this.showFilter;
  }

  goToPayment(hospital: HospitalScheduling) {
    const payload = {
      code: this.surgeryAppointment.code,
      timetableCode: this.form.value.surgeryTime,
      scheduleDate: this.parseDateToBackUtil(this.form.value.surgeryDate),
      hospitalCode: hospital.code,
      surgeonCode: this.surgeonId,
      step: 'falta implementar o step a seguir', // falta implementar o step a seguir
    }
    console.log(payload);
    const subscription = this.schedulingLocalStorageService.setSurgery(payload).subscribe(() => {
      this.router.navigate(['main/payments/home/surgery']).then();
    });
    this.subscriptions.push(subscription);
  }
}
