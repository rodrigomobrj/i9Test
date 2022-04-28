import { Surgerie } from '../../models/surgerie.model';
import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {SurgeriesService} from "../../../shared/services/surgeries/surgeries.service";
import {Subscription} from "rxjs";
import {SurgeryDetailModel} from "../../models/surgery-detail.model";

@Component({
  selector: 'app-surgery-detail',
  templateUrl: './surgery-detail.component.html',
  styleUrls: ['./surgery-detail.component.scss'],
})
export class SurgeryDetailComponent implements OnInit {

  subscriptions: Subscription[] = [];
  surgeryDetails: SurgeryDetailModel[] = [];
  surgeries: Surgerie[] = [];
  surgeryId: string;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private surgeriesService: SurgeriesService
  ) { }

  ngOnInit() {
    this.getSurgery();
  }

  getSurgery() {
    this.surgeryId = this.route.snapshot.url[1].path;
    const subscription = this.surgeriesService.getSurgeryDetailById(this.surgeryId).subscribe(
      response => {
        this.surgeryDetails = response.data;
      },
    );
    this.subscriptions.push(subscription);
  }

  back() {
    this.location.back();
  }

  continue() {
    this.router.navigate(['main', 'my-data', this.surgeryId]).then();
  }

}
