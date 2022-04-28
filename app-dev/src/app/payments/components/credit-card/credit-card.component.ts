import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { isTouchedAndInvalidUtil } from '../../../shared/utils/isTouchedAndInvalid.util';
import { CreditCard, Installment } from '../../models/credit-card.model';
import {SchedulingLocalStorageService} from "../../../shared/services/local-storage/face-to-face-scheduling-local-storage/scheduling-local-storage.service";
import {FaceToFaceSchedulingModel} from "../../../scheduling/model/face-to-face-scheduling.model";
import {Subscription} from "rxjs";
import {SchedulingFaceToFaceService} from "../../service/scheduling-face-to-face/scheduling-face-to-face.service";
import {SchedulingSurgeryService} from "../../../schedule-surgery/services/scheduling-surgery.service";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {

  form: FormGroup;
  listCountries: string[] = ['Brasil', 'EUA', 'Argentina', 'Uruguai', 'Portugal', 'Inglaterra', 'Espanha', 'China', 'Japão', 'Japão'];
  showModal: boolean = false;
  surgeryPriceMock: number = 250;
  subscriptions: Subscription[] = [];
  listInstallment: Installment[] = [
    {amount: '1x de ' ,value: this.surgeryPriceMock, method: 'à vista'},
    {amount: '2x de ',value: (this.surgeryPriceMock / 2), method: 'sem juros'},
    {amount: '3x de ',value:  (this.surgeryPriceMock / 3), method: 'sem juros'},
    {amount: '5x de ',value: (this.surgeryPriceMock / 5), method: 'sem juros'} ,
    {amount: '6x de ',value:  (this.surgeryPriceMock / 6), method: 'sem juros'},
    {amount: '10x de ',value:  (this.surgeryPriceMock / 10), method: 'sem juros'}
  ];
  inCash: string = 'à vista';
  selectPaymentMethod: Installment;
  scheduling: any;
  typeService = 'surgery';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private schedulingStorageService: SchedulingLocalStorageService,
    private schedulingFaceToFaceService: SchedulingFaceToFaceService,
    private schedulingSurgeryService: SchedulingSurgeryService,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSchedulingObj();
    this.getTypeService();
  }

  ionViewWillEnter() {
    this.getSchedulingObj();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  getTypeService() {
    const subscription = this.route.params.subscribe(
      params => {
        this.typeService = params['typeService'];
      }
    );
    this.subscriptions.push(subscription);
  }

  getSchedulingObj() {
    const subscription = this.schedulingStorageService.getSurgery().subscribe(schedulingObj => {
      this.scheduling = schedulingObj;
    });
    this.subscriptions.push(subscription);
  }

  createForm() {
    this.form = this.fb.group({
      cardNumber: [null, Validators.required],
      expirationData: [null, Validators.required],
      cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      cardName: [null, Validators.required],
      country: [null, Validators.required],
      installment: [null, Validators.required]
    });
  }

  createObject(formValue: any) : CreditCard {
    return {
      cardNumber: formValue.cardNumber,
      expirationDate: formValue.expirationDate,
      cvv: formValue.cvv,
      cardName: formValue.cardName,
      country: formValue.country,
      installment: formValue.installment
    }
  }

  send() {
    const creditCard = this.form.value
    this.createObject(creditCard);
    this.selectPaymentMethod = creditCard.installment;
    if(creditCard.installment.numberInstallment === '1x de')
      this.showModal = true;
    else
      this.inCash = 'sem juros';
      this.showModal = true;
  }

  confirmPayment() {
    if (this.typeService == 'surgery') {
      this.schedulingSurgeryService.surgeryScheduling(this.scheduling).subscribe(response => {
        this.router.navigate(['main/scheduled-performed-surgeries']).then();
      });
    } else {
      this.schedulingFaceToFaceService.schedulingFaceToFace(this.scheduling).subscribe(response => {
        this.router.navigate(['main/scheduled-performed-surgeries']).then();
      });
    }
  }

  isTouchedAndInvalid(formControl: string) {
    return isTouchedAndInvalidUtil(formControl, this.form);
  }

  hideModal() {
    this.showModal = false;
  }
}
