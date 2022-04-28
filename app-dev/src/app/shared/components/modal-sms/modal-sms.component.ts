import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal-sms',
  templateUrl: './modal-sms.component.html',
  styleUrls: ['./modal-sms.component.scss'],
})
export class ModalSmsComponent implements OnInit, OnDestroy {

  @Output() buttonSend: EventEmitter<string> = new EventEmitter<string>();
  @Output() buttonResend: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  showError = false;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
    this.listeningForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createForm() {
    this.form = this.fb.group({
      numberOne: [null, [Validators.required]],
      numberTwo: [null, [Validators.required]],
      numberThree: [null, [Validators.required]],
      numberFour: [null, [Validators.required]],
      numberFive: [null, [Validators.required]],
    });
  }

  goToNextInput(formControlName: string, nextFormControlElement: HTMLInputElement) {
    if (!nextFormControlElement) {
      return;
    }
    const formControl = this.form.get(formControlName);
    if (formControl.valid) {
      nextFormControlElement.focus();
    }
  }

  listeningForm() {
    this.subscription = this.form.statusChanges.subscribe(status => {
      if (status == 'VALID') {
        this.toSend();
      }
    });
  }

  toSend() {
    if (this.form.valid) {
      const smsCode = this.getSmsCode();
      this.buttonSend.emit(smsCode);
      this.showError = false;
    } else {
      this.showError = true;
    }
  }

  private getSmsCode(): string {
    const formValue = this.form.getRawValue();
    let smsCode = '';
    for (const property in formValue) {
      smsCode = smsCode + formValue[property];
    }
    return smsCode;
  }
}
