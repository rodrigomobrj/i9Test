import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {SurgeonSearchRequestModel} from "../../models/surgeon-search-request.model";
import {searchModel} from "../../models/search.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SchedulingFacetofaceService} from "../../services/scheduling-facetoface.service";

@Component({
  selector: 'app-face-to-face-appointment-list',
  templateUrl: './face-to-face-appointment-list.component.html',
  styleUrls: ['./face-to-face-appointment-list.component.scss'],
})
export class FaceToFaceAppointmentListComponent implements OnInit, OnDestroy {

  minValue = 100;
  maxValue = 10000;
  showFilter = true;
  subscriptions: Subscription[] = [];
  surgeryId: string;
  loading = false;
  form: FormGroup = this.fb.group({
    search: [''],
    typeSearch: ['surgeon'],
    bestEvaluated: [false],
    price: [''],
  });
  searchList: searchModel[] = [];

  constructor(
    private fb: FormBuilder,
    private schedulingFacetofaceService: SchedulingFacetofaceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getSurgeonList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  getSurgeonList() {
    const subscription = this.route.params.pipe(
      switchMap(urlParam => {
        this.surgeryId = urlParam.id;
        return this.schedulingFacetofaceService.getPriceRange(this.surgeryId);
      }),
      switchMap(response => {
        this.minValue = Number(response.data.minPrice);
        this.maxValue = Number(response.data.maxPrice);
        this.form.get('price').setValue({lower: this.minValue, upper: this.maxValue});
        const searchParams = {
          minPrice: response.data.minPrice,
          maxPrice: response.data.maxPrice,
          bestRating: false,
          surgeryCode: this.surgeryId,
        }
        if (this.form.value.typeSearch == 'surgeon') {
          return this.schedulingFacetofaceService.searchSurgeon(searchParams);
        }
        return this.schedulingFacetofaceService.searchHospitals(searchParams);
      })
    ).subscribe(response => {
      this.searchList = response.data;
    });
    this.subscriptions.push(subscription);
  }

  createForm() {
    const subscription = this.form.valueChanges.pipe(
      debounceTime(1000),
      switchMap(formValue => {
        this.loading = true;
        const searchObj = this.createSearchObj(formValue);
        if (formValue.typeSearch == 'surgeon') {
          return this.schedulingFacetofaceService.searchSurgeon(searchObj);
        }
        return this.schedulingFacetofaceService.searchHospitals(searchObj);
      })
    ).subscribe(response => {
      this.searchList = response.data;
      this.loading = false;
    });
    this.subscriptions.push(subscription);
  }

  createSearchObj(formValue): SurgeonSearchRequestModel {
   return {
     bestRating: formValue.bestEvaluated,
     minPrice: formValue.price.lower ? formValue.price.lower : 0,
     maxPrice: formValue.price.upper ? formValue.price.upper : 10000,
     surgeryCode: this.surgeryId,
     name: formValue.search,
   }
  }

  showFilterMethod() {
    this.showFilter = !this.showFilter;
  }

  goToDetail(surgeonSearch: searchModel) {
    const typeSearch = this.form.value.typeSearch;
    let code = typeSearch == 'hospital' ? surgeonSearch.hospital.code : surgeonSearch.surgeon.code;
    this.router.navigate([
      '/main/scheduling-facetoface-consultations/details/',
      typeSearch,
      code,
      this.surgeryId,
    ]).then();
  }

}
