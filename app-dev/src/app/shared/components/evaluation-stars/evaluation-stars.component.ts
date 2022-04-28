import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-evaluation-stars',
  templateUrl: './evaluation-stars.component.html',
  styleUrls: ['./evaluation-stars.component.scss'],
})
export class EvaluationStarsComponent implements OnInit, OnChanges {

  @Output() starSelect: EventEmitter<any> = new EventEmitter<any>();
  numberStars: number = 5;
  @Input() value: number;
  @Input() isStarLarge: boolean = false;
  stars: string[] = [];

  constructor() { }

  ngOnInit() {
    this.activatedEvaluation();
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.activatedEvaluation();
  }

  activatedEvaluation() {
    this.stars = [];
    let tmp = this.value
    for(let i = 0; i < this.numberStars; i++, tmp--) {
      if(tmp >= 1) {
        this.stars.push("star");
      }else if(tmp > 0 && tmp <1){
        this.stars.push('star-half');
      }else{
        this.stars.push('star-outline');
      }
    }
  }

  toEvaluete(index) {
    this.value = index + 1;
    this.starSelect.emit(this.value);
    this.activatedEvaluation();
  }


}
