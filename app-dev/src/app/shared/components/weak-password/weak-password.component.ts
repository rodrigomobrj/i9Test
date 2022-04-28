import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-weak-password',
  templateUrl: './weak-password.component.html',
  styleUrls: ['./weak-password.component.scss'],
})
export class WeakPasswordComponent implements OnInit {

   @Input() isStrongPassword: boolean;

  constructor() { }

  ngOnInit() {}

  getPercentage(): number {
    if (this.isStrongPassword) {
      return 100;
    } else {
      return 20;
    }
  }

  getProgressBarColor(): ThemePalette {
    if (this.isStrongPassword) {
      return 'accent';
    } else {
      return 'warn';
    }
  }
}
