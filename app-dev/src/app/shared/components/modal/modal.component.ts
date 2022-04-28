import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  {
  @Input() title: string = '';
  @Input() titlePrimaryButton: string = '';
  @Input() titleSecondaryButton: string = '';
  @Input() modalVersion: 1 | 2 = 2;
  @Output() clickPrimaryButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() clickSecondaryButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();
  hideModalMethod(event) {
    const className = event.target.className;
    if (className == 'modal-background') {
      this.hideModal.emit();
    }
  }
}
