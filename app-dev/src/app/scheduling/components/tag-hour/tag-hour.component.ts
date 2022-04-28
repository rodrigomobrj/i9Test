import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AppointmentHoursModel} from "../../../shared/models/appointment-hours.model";

@Component({
  selector: 'app-tag-hour',
  templateUrl: './tag-hour.component.html',
  styleUrls: ['./tag-hour.component.scss'],
})
export class TagHourComponent implements OnInit, OnChanges {

  @Input() hourList: AppointmentHoursModel[] = [];
  @Input() haveTime = true;
  @Output() isValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() valueChanges: EventEmitter<AppointmentHoursModel> = new EventEmitter<AppointmentHoursModel>();
  form: FormGroup = this.fb.group({
    hourList: this.fb.array([], this.validatingSelectedTime),
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.resetTagHour();
    this.createTagHour();
  }

  ngOnChanges() {
    this.resetTagHour();
    this.createTagHour();
    this.triggerEvent();
  }

  createTagHour() {
    this.hourList.forEach(hour => {
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
    setTimeout(() => {
      this.triggerEvent();
    });
  }

  triggerEvent() {
    this.isValid.emit(this.form.valid);
    this.valueChanges.emit(this.getHourSelected());
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
