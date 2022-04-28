import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from "../../services/user-info/user-info.service";
import {Location} from '@angular/common';
import {dateValidator} from "../../../shared/validators/date.validator";
import {parseDateToBackUtil} from "../../../shared/utils/parseDateToBackUtil";
import {adjustmentMaskHeightUtil} from "../../../shared/utils/adjustmentMaskHeight.util";
import {adjustmentMaskWeightUtil} from "../../../shared/utils/adjustmentMaskWeight.util";
import {UserInfoResponseModel} from "../../model/user-info-response.model";
import {of, Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from '@angular/router';
import { OccupationsService } from '../../services/occupations/occupations.service';
import { OccupationModel } from '../../model/occupation.model';
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
})
export class MyDataComponent implements OnInit, OnDestroy {

  form: FormGroup;
  userInfo: UserInfoResponseModel;
  thereIsInfo = true;
  subscriptions: Subscription[] = [];
  occupations: OccupationModel[] = [];
  disabledLoginButton = false;
  surgeryId: string;
  loading = false;

  educationLevelList = [
    {value: 'Ensino Fundamental Incompleto'},
    {value: 'Ensino Fundamental'},
    {value: 'Ensino Médio Incompleto'},
    {value: 'Ensino Médio Completo'},
    {value: 'Ensino Superior Incompleto'},
    {value: 'Ensino Superior Completo'},
    {value: 'Pós-graduação'},
    {value: 'Mestrado'},
    {value: 'Doutorado'},
  ]

  genderList = [
    {value: 'Masculino'},
    {value: 'Feminino'},
    {value: 'Não quero informar'},
  ]

  constructor(
    private fb: FormBuilder,
    private userInfoService: UserInfoService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router: Router,
    private occupationsService: OccupationsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getUserInfo();
    this.searchOccupations();
    this.getIdSurgery();
  }

  searchOccupations() {
    const subscription = this.form.get('occupation').valueChanges.pipe(
      debounceTime(1000),
      switchMap(value => {
        if(value && value.length < 3) {
          return of(null);
        } else
          return this.occupationsService.getAllOccupation(value);
      }),
    ).subscribe((response) => {
      if (response) {
        this.occupations = response.data.rows;
      } else {
        this.occupations = [];
      }
    });
    this.subscriptions.push(subscription);
  }

  getIdSurgery() {
    const subscription = this.route.params.subscribe(params => {
      this.surgeryId = params['id'];
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  private getUserInfo() {
    this.loading = true;
    const subscription = this.userInfoService.getUserInfo().subscribe(
      response => {
        this.loading = false;
        this.userInfo = response.data;
        this.updateForm(this.userInfo);
        if (!this.userInfo.docNum) {
          this.thereIsInfo = false;
        }
        if (this.thereIsInfo && this.surgeryId) {
          this.router.navigate(['main', 'risk-classification', 'questions', 'create', this.surgeryId]).then();
        }
      },
      () => {this.loading = false}
    );
    this.subscriptions.push(subscription);
  }

  private createForm() {
    this.form = this.fb.group({
      birthDate: [null, [dateValidator]],
      docNum: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      height: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      education: [null, [Validators.required]],
      occupation: [null, [Validators.required]],
      workingAt: [null, [Validators.required]],
    });
  }

  private updateForm(userInfo: UserInfoResponseModel) {
    this.form.get('birthDate').setValue(userInfo.birthDate);
    this.form.get('docNum').setValue(userInfo.docNum);
    this.form.get('weight').setValue(userInfo.weight);
    this.form.get('height').setValue(userInfo.height);
    this.form.get('gender').setValue(userInfo.gender);
    this.form.get('education').setValue(userInfo.education);
    this.form.get('occupation').setValue(userInfo.occupation);
    this.form.get('workingAt').setValue(userInfo.workingAt);
  }

  back() {
    this.location.back();
  }

  saveForm() {
    const valueForm = this.adjustedFormValue();
    if(!this.thereIsInfo) {
      this.createOrUpdateUserInfo(valueForm, 'createUserInfo');
    } else {
      this.createOrUpdateUserInfo(valueForm, 'updateUserInfo');
    }
  }

  adjustedFormValue(): any {
    const valueForm = this.form.getRawValue();
    valueForm.birthDate = parseDateToBackUtil(valueForm.birthDate);
    valueForm.weight = adjustmentMaskWeightUtil(valueForm.weight);
    valueForm.height = adjustmentMaskHeightUtil(valueForm.height);
    return valueForm;
  }

  createOrUpdateUserInfo(valueForm, methodName) {
    this.disabledLoginButton = true;
    const subscription = this.userInfoService[methodName](valueForm).subscribe(
      data => {
        this.showRiskClassification();
        this.disabledLoginButton = false;
        this.snackBar.open('Dados salvos com sucesso.', 'Ok', {duration: 2000});
      },
      error => {
        this.disabledLoginButton = false;
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 2000});
      }
    );
    this.subscriptions.push(subscription);
  }

  showRiskClassification() {
    if (this.surgeryId) {
      this.router.navigate(['main', 'risk-classification', 'questions', 'create', this.surgeryId]).then();
    } else {
     this.back();
    }
  }

}
