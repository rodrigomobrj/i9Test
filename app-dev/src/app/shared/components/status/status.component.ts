import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {

  @Input() color: 'green' | 'blue' | 'purple' = 'green';
  @Input() value: string;

  getClassColor() {
    switch (this.color) {
      case 'blue' :
        return 'status status-blue';
      case 'green' :
        return 'status status-green';
      case 'purple' :
        return 'status status-purple';
    }
  }

}
