import { FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from "../../../shared/services/user/user.service";
import {AuthenticationService} from "../../../core/services/authentication/authentication.service";
import {debounceTime, switchMap} from "rxjs/operators";
import {of, Subscription} from 'rxjs';
import { SurgeriesService } from 'src/app/shared/services/surgeries/surgeries.service';
import {Surgerie} from "../../models/surgerie.model";
import {Router} from "@angular/router";
import {ResponseModel} from "../../../shared/models/response.model";
import {ResponseListModel} from "../../../shared/models/ResponseList.model";


@Component({
  selector: 'app-new-surgery-list',
  templateUrl: './new-surgery-list.component.html',
  styleUrls: ['./new-surgery-list.component.scss'],
})
export class NewSurgeryListComponent implements OnInit, OnDestroy {

  nameSurgery: FormControl = new FormControl(null);
  surgeries: Surgerie[] = [];
  firstSurgeries: ResponseModel<ResponseListModel<Surgerie[]>>;
  subscriptions: Subscription[] = [];
  loading = false;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private surgeriesService: SurgeriesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.searchByName();
    this.getAllSurgeries();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  searchByName() {
    this.loading = true;
    const subscription = this.nameSurgery.valueChanges.pipe(
      debounceTime(1000),
      switchMap(value => {
        if(value.length < 3) {
          return of(this.firstSurgeries);
        } else
        return this.surgeriesService.getAllSurgeriesByName(value);
      }),
    ).subscribe((response) => {
      if (response) {
        this.surgeries = response.data.rows;
      }
      this.loading = false;
    });
    this.subscriptions.push(subscription);
  }

  getAllSurgeries() {
    this.loading = true;
    const subscription = this.surgeriesService.getAllSurgeries().subscribe(
      response => {
        this.surgeries = response.data.rows;
        this.firstSurgeries = response;
        this.loading = false;
      },
      () => {this.loading = false}
    );
    this.subscriptions.push(subscription);
  }

  showDetail(code: string) {
    this.router.navigate(['main', 'new-surgery', 'detail', code]).then();
  }
}
