import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SchedulingFacetofaceService } from '../../services/scheduling-facetoface.service';
import { SurgeonOrHospital, Details } from '../../models/surgeonOrHospital.model';
import { Observable, Subscription } from 'rxjs';
import { ResponseModel } from 'src/app/shared/models/response.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './appointments-details.component.html',
  styleUrls: ['./appointments-details.component.scss'],
})
export class AppointmentsDetailsComponent implements OnInit, OnDestroy {

  profileScreen: string;
  profileCode: string;
  surgeryCode: string;
  subscriptions: Subscription[] = [];
  about_profile: string;
  typeProfile: string;
  profileDetail: SurgeonOrHospital[] = [];
  whereOrWhoAttend: string;
  rating: number;
  photo: string;
  loading: boolean = false;
  hospitalOrSurgeonDetail: Details[] = [];
  avatar: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private schedulingFacetoface: SchedulingFacetofaceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getSurgeryAndSurgeonById()

    this.showSurgeonOrHospitalDetails();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getSurgeryAndSurgeonById() {
    const subscription = this.route.params.subscribe(
      params => {
        this.typeProfile = params['typeProfile'];
        this.surgeryCode = params['surgeryId'];
        this.profileCode = params['profileId'];
      }
    )
    this.subscriptions.push(subscription);
  }

  showSurgeonOrHospitalDetails() {
    this.loading = true;
    if(this.typeProfile == 'surgeon') {
      this.showDetailSurgeon();
    }else {
      this.showDetailHospital();
    }
  }

  showDetailHospital() {
    const subscription = this.schedulingFacetoface.getHospitalById(this.profileCode, this.surgeryCode).subscribe(
        (response: ResponseModel<SurgeonOrHospital[]>) => {
        this.profileScreen = 'INFORMAÇÕES DO HOSPITAL';
        this.about_profile = 'hospital';
        this.profileDetail = response.data;
        this.whereOrWhoAttend = 'Cirurgiões que atendem';
        this.getRatingAndPhoto(response.data);
        this.getHospitalWhereDoctorAttend(response.data);
        this.loading = false;
      },
      (err) => {
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000});
        this.loading = false;
      }
    )
    this.subscriptions.push(subscription);
  }

  showDetailSurgeon() {
    const subscription = this.schedulingFacetoface.getSurgeonById(this.profileCode, this.surgeryCode).subscribe(
      (response: ResponseModel<SurgeonOrHospital[]>) => {
        this.avatar = true;
        this.profileScreen = 'PERFIL DO CIRURGIÃO';
        this.about_profile = 'médico';
        this.profileDetail = response.data;
        this.whereOrWhoAttend = 'Hospitais onde atendo';
        this.getRatingAndPhoto(response.data);
        this.getHospitalWhereDoctorAttend(response.data);
        this.loading = false;
      },
      (err) => {
        this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000});
        this.loading = false;
      }
    )
    this.subscriptions.push(subscription);
  }

  toScheduleSurgery() {
    let typeProfile = 'surgeons';
    if(this.typeProfile != 'surgeon') {
      typeProfile = 'hospitals';
    }
    this.router.navigate(['main/scheduling/facetoface-consultation', typeProfile, this.profileCode ,this.surgeryCode]).then();
  }

  getRatingAndPhoto(data: SurgeonOrHospital[]) {
    data.forEach(response => {
      this.rating = response.rating;
      this.photo = response.photo;
    })
  }

  getHospitalWhereDoctorAttend(data: SurgeonOrHospital[]) {
    data.forEach(response => {
      this.hospitalOrSurgeonDetail = response.whereOrWhoAttend;
    })
  }

}
