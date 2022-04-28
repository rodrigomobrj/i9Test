import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterEvent} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scheduled-detail',
  templateUrl: './scheduled-detail.component.html',
  styleUrls: ['./scheduled-detail.component.scss'],
})
export class ScheduledDetailComponent implements OnInit {

  selectedPath = '';
  surgeryId = '';
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getSelectedPath();
    this.getSurgeryId();
  }

  ionViewWillEnter() {
    this.getSelectedPath();
    this.getSurgeryId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  getSelectedPath() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  getSurgeryId() {
    this.route.params.subscribe(params => {
      this.surgeryId = params.id;
    })
  }
}
