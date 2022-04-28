import { Appointments } from '../../models/appointments.model';
import { FormArray } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ResponseModel } from '../../../shared/models/response.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RiskRating } from '../../models/riskRating.model';
import { Subscription } from 'rxjs';
import { RiskRatingsService } from '../../services/risk-rating.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import {ScheduledPerformedLocalStorageService} from "../../../shared/services/local-storage/scheduled-performed-surgeries-local-storage/scheduled-performed-local-storage.service";
import {
  SurgeryAppointmentResponseModel,
} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {

  riskRatings: RiskRating[] = [];
  subscriptions: Subscription[] = [];
  form: FormGroup;
  confirmedRisk: string[] = [];
  draftInformation: string[] = [];
  modalDraft: boolean = false;
  NEXT_STEP: string = 'main/risk-classification/additional-infos/edit';
  data: Appointments = {step: this.NEXT_STEP};
  code: string;
  surgeryAppointmentSelected: SurgeryAppointmentResponseModel;
  typePage = 'create';

  constructor(
    private riskRatingsService: RiskRatingsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private storageService: ScheduledPerformedLocalStorageService,
  ) {  }

  ngOnInit(): void {
    this.getSurgeryById();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  createForm() {
    this.form = this.fb.group({
      risk: this.fb.array([])
    });
  }

  get risk(): FormArray {
    return this.form.get('risk') as FormArray;
  }

  getSurgeryById() {
    const subscription = this.route.params.subscribe(
      params => {
        this.createForm();
        this.code = params['id'];
        this.typePage = params['typePage'];
        if (this.typePage == 'create') {
          this.getRiskRatings();
        } else {
          this.setValueInForm();
        }
      }
    )
    this.subscriptions.push(subscription);
  }

  setValueInForm() {
    const subscription = this.storageService.getSurgery().pipe(
      switchMap(surgeryAppointment => {
        this.surgeryAppointmentSelected = surgeryAppointment;
        return this.riskRatingsService.getRiskRatings();
      })
    ).subscribe(response => {
      this.riskRatings = response.data;
      response.data.forEach(value => {
        const riskRating = this.surgeryAppointmentSelected.riskRatings.find(risk => risk.detail == value.description);
        let formControl;
        if (riskRating) {
          formControl = this.fb.control(true);
        } else {
          formControl = this.fb.control(false);
        }
        this.risk.push(formControl);
      })
    });
    this.subscriptions.push(subscription);
  }

  getRiskRatings() {
    const subscription = this.riskRatingsService.getRiskRatings().subscribe(
      (response: ResponseModel<RiskRating[]>) => {
        this.riskRatings = response.data;
        response.data.forEach(() => {
          const formControl = this.fb.control(false);
          this.risk.push(formControl);
        })
      },
      () => {
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000})
      }
    );
    this.subscriptions.push(subscription);
  }

  saveRisk(draft: boolean) {
    let url: string = this.NEXT_STEP;
    this.data.step = draft ? 'main/risk-classification/questions/edit' : url;
    this.getDataRiskRatings();
    if (this.typePage == 'create') {
      this.createAppointments(draft);
    } else {
      this.updateAppointments(draft);
    }
  }

  getDataRiskRatings(){
    this.data.riskRatings = [];
    for(let i = 0; i <= this.riskRatings.length; i++) {
      if(this.risk.controls[i] && this.risk.controls[i].value == true) {
        this.data.riskRatings.push(this.riskRatings[i].description);
      }
    };
  }

  createAppointments(draft: boolean) {
    this.data.surgeryCode = this.code;
    if(!draft) {
      this.data.riskRatingsChecked = true;
    }
    const subscription = this.riskRatingsService.createAppointments(this.data).subscribe(
      (response: ResponseModel<string>) => {
        if(!draft) {
          this.router.navigate(['main/risk-classification/additional-infos', 'create', response.data]).then();
        } else {
          this.router.navigate(['main/scheduled-performed-surgeries']).then();
          this.showModalDraft();
        }
      },
      () => {
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000})
      }
    );
    this.subscriptions.push(subscription);
  }

  updateAppointments(draft: boolean) {
    this.data.code = this.code;
    if(!draft) {
      this.data.riskRatingsChecked = true;
    }
    const subscription = this.riskRatingsService.updateAppointments(this.data).subscribe(
      (response: ResponseModel<string>) => {
        if(!draft) {
          this.router.navigate(
            ['main/risk-classification/additional-infos', 'edit', this.surgeryAppointmentSelected.code]
          ).then();
        } else {
          this.router.navigate(['main/scheduled-performed-surgeries']).then();
          this.showModalDraft();
        }
      },
      () => {
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000})
      }
    );
    this.subscriptions.push(subscription);
  }

  showModalDraft() {
    this.modalDraft = true;
  }

  changeToggle(index) {
    const control = (this.form.get('risk') as FormArray).at(index);
    const value = control.value;
    control.setValue(!value);
  }
}



