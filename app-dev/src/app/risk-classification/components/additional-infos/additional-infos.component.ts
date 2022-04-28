import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { AllergyListModel } from 'src/app/shared/models/allergie.model';
import { MedicationListModel } from 'src/app/shared/models/medication.model';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { ResponseListModel } from 'src/app/shared/models/ResponseList.model';
import { SurgeryAppointmentResponseModel } from 'src/app/shared/models/surgery-appointments/surgery-appointment-response.model';
import { Appointments } from '../../models/appointments.model';
import { RiskRatingsService } from '../../services/risk-rating.service';
import {schedulingEnum} from "../../../scheduling/enum/scheduling.enum";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-additional-infos',
  templateUrl: './additional-infos.component.html',
  styleUrls: ['./additional-infos.component.scss'],
})
export class AdditionalInfosComponent implements OnInit, OnDestroy {

  useMedicationsValue: boolean = false;
  haveAllergiesValue: boolean = false;
  allergiesList = [];
  useMedicationsList = [];
  subscriptions: Subscription[] = [];
  modalVisible = false;
  code: string;
  loading = false;

  form: FormGroup = this.formBuilder.group({
    files: ([]),
    useMedications: this.formBuilder.array([]),
    haveAllergies: this.formBuilder.array([])
  })

  constructor(
    private formBuilder: FormBuilder,
    private riskRatingService: RiskRatingsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.getAllergiesAndMedications();
    this.getCode();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      files: ([]),
      useMedications: this.formBuilder.array([]),
      haveAllergies: this.formBuilder.array([])
    })
  }

  getCode() {
    const subscription = this.activatedRoute.params.pipe(
      take(1),
      mergeMap(params => {
        this.loading = true;
        this.code = params['id'];
        return this.riskRatingService.getFilesUploaded(this.code);
      }),
      mergeMap(files => {
        this.form.get('files').setValue(files.data);
        return this.riskRatingService.getAppointments(this.code);
      })
    ).subscribe(
      response => {
        this.loading = false;
        this.setMedicationAndAllergy(response);
      },
      () => {this.loading = false}
    );
    this.subscriptions.push(subscription);
  }

  get useMedications(): FormArray {
    return this.form.get('useMedications') as FormArray;
  }

  get haveAllergies(): FormArray {
    return this.form.get('haveAllergies') as FormArray;
  }

  setMedicationAndAllergy(response: ResponseModel<ResponseListModel<SurgeryAppointmentResponseModel[]>>) {
    const data = response.data.rows[0];
    const allergyResponse = data.allergies;
    const medicationResponse = data.medications;
    const allergyList = [];
    const medicationList = [];
    if (allergyResponse && allergyResponse.length) {
      this.haveAllergiesToggle();
      allergyResponse.forEach(allergy => {
        allergyList.push(allergy.allergy);
      })
    }
    if (medicationResponse && medicationResponse.length) {
      this.useMedicationsToggle();
      medicationResponse.forEach(medication => {
        medicationList.push(medication.medication);
      })
    }
    this.form.get('haveAllergies').setValue([allergyList]);
    this.form.get('useMedications').setValue([medicationList]);
  }

  getAllergiesAndMedications() {
    this.riskRatingService.getMedications()
      .pipe(
        mergeMap((medications: ResponseModel<MedicationListModel>) => {
          this.useMedicationsList = medications.data.rows;
          return this.riskRatingService.getAllergies();
        })
      ).pipe(take(1)).subscribe((allergies: ResponseModel<AllergyListModel>) => {
        this.allergiesList = allergies.data.rows;
      }, () => {
      this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000});
    })
  }

  useMedicationsToggle() {
    this.useMedicationsValue = !this.useMedicationsValue;
    this.addControlInArray(this.useMedications, this.useMedicationsValue);
  }

  haveAllergiesToggle() {
    this.haveAllergiesValue = !this.haveAllergiesValue;
    this.addControlInArray(this.haveAllergies, this.haveAllergiesValue);
  }

  addControlInArray(formArray: FormArray, toggleValue: boolean) {
    if (toggleValue) {
      const formControl = this.formBuilder.control('', Validators.required)
      formArray.push(formControl);
    } else {
      formArray.removeAt(0);
    }
  }

  showModal() {
    this.modalVisible = true;
  }

  uploadFileError(error: string) {
    this.snackBar.open(error, 'Ok', { duration: 3000 });
  }

  saveDraft() {
    this.loading = true;
    const appointments = this.createObjectToSave(false);
    this.riskRatingService.updateAppointments(appointments)
      .pipe(take(1))
      .subscribe(
        () => {
          this.loading = false;
          this.snackBar.open('Informações salvas como rascunho', 'Ok', { duration: 3000 });
          this.router.navigate(['main/scheduled-performed-surgeries']).then();
        },
        () => {this.loading = false}
      )
  }

  saveRisk() {
    this.loading = true;
    const appointments = this.createObjectToSave(true);
    this.riskRatingService.updateAppointments(appointments)
      .pipe(take(1))
      .subscribe(
        () => {
          this.loading = false;
          this.modalVisible = true;
        },
        () => {this.loading = false}
      )
  }

  backToHome() {
    this.router.navigate(['main/scheduled-performed-surgeries']).then();
  }

  createObjectToSave(saveRisk: boolean): Appointments {
    const appointments: Appointments = {
      code: this.code,
      step: saveRisk ? `main/scheduling/${schedulingEnum.online}` : 'main/risk-classification/additional-infos/edit',
    }
    const files = this.form.value.files;
    const medications = this.form.value.useMedications;
    const allergies = this.form.value.haveAllergies;

    if (medications && medications.length) {
      appointments.medicationCodes = [];
      medications[0].forEach(data => {
        appointments.medicationCodes.push(data.code);
      })
    }

    if (allergies && allergies.length) {
      appointments.allergyCodes = [];
      allergies[0].forEach(data => {
        appointments.allergyCodes.push(data.code);
      })
    }

    if (files.length) {
      appointments.attachments = files;
    }

    if (saveRisk) {
      appointments.additionalInformationChecked = true;
    }

    return appointments
  }

}
