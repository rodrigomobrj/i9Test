import {Component, OnDestroy} from '@angular/core';
import {SurgeryAppointmentsService} from "../../../shared/services/surgery-appointments/surgery-appointments.service";
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {StatusEnum} from "../../enums/status.enum";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ScheduledPerformedLocalStorageService} from "../../../shared/services/local-storage/scheduled-performed-surgeries-local-storage/scheduled-performed-local-storage.service";
import { Evaluation } from '../../models/evaluation.model';
import { EvaluationService } from '../../services/evaluation/evaluation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scheduled-performed-surgeries',
  templateUrl: './scheduled-performed-surgeries.component.html',
  styleUrls: ['./scheduled-performed-surgeries.component.scss'],
})
export class ScheduledPerformedSurgeriesComponent implements OnDestroy {

  surgeryAppointmentList: SurgeryAppointmentResponseModel[] = [];
  statusEnum = StatusEnum;
  subscriptions: Subscription[] = [];
  loading = false;

  /* Modal de avaliação */
  evaluationModal: boolean = false;
  evalueteParams: boolean = false;
  maximumRating: boolean = false;
  evaluationParams: string[] = ['Hospital', 'Cirurgião', 'Atendimento'];
  ratingDisplayed: string[] = ['', 'Péssimo', 'Ruim', 'Razoável', 'Bom', 'Ótimo'];
  mainEvaluation: number = 0;
  evaluationGrade: Evaluation = {hospitalRating: 0, surgeonRating: 0, attendanceRating: 0};
  idSurgeryPerformed: string;

  constructor(
    private surgerySchedulingService: SurgeryAppointmentsService,
    private router: Router,
    private storageService: ScheduledPerformedLocalStorageService,
    private evaluationService: EvaluationService,
    private snackBar: MatSnackBar,
  ) { }

  ionViewWillEnter() {
    this.getSurgeryScheduling();
    this.getIdSurgeryPerformed();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  getSurgeryScheduling() {
    this.loading = true;
    const subscription = this.surgerySchedulingService.getSurgeryScheduling().subscribe(
      data => {
        if (data.data.rows.length == 0) {
          this.goToNewSurgery();
        }
        this.surgeryAppointmentList = data.data.rows;
        this.loading = false;
        subscription.unsubscribe();
      },
      error => {
        this.loading = false;
      }
    );
  }

  goToNewSurgery() {
    this.router.navigate(['main/new-surgery']).then();
  }

  showDetail(code: string) {
    this.router.navigate(['main/scheduled-performed-surgeries/detail', code, 'patient', code]).then();
  }

  goToNextScreen(surgeryAppointment: SurgeryAppointmentResponseModel) {
    const subscription = this.storageService.setSurgery(surgeryAppointment).subscribe(() => {
      const url = `${surgeryAppointment.step}/${surgeryAppointment.code}`;
      this.router.navigate([url]).then();
      subscription.unsubscribe();
    });
  }

  getLabelStatus(status: string) {
    return this.surgerySchedulingService.getLabelStatus(status);
  }

  getColorStatus(status: string) {
    return this.surgerySchedulingService.getColorStatus(status);
  }

  scheduleAppointmentInPerson(surgeryAppointment: SurgeryAppointmentResponseModel) {
    const subscription = this.storageService.setSurgery(surgeryAppointment).subscribe(() => {
      const url = `${surgeryAppointment.step}/${surgeryAppointment.surgery.code}`;
      this.router.navigate([url]).then();
      subscription.unsubscribe();
    });
  }

  scheduleSurgery(surgeryAppointment: SurgeryAppointmentResponseModel) {
    const subscription = this.storageService.setSurgery(surgeryAppointment).subscribe(() => {
      if (surgeryAppointment.hospital) {
        if (surgeryAppointment.hospital.code) {
          this.router.navigate(['main/scheduling/surgery']).then();
        } else {
          this.router.navigate(['main/schedule-surgery/hospital', surgeryAppointment.surgeon.code]).then();
        }
      } else {
        this.router.navigate(['main/schedule-surgery/hospital', surgeryAppointment.surgeon.code]).then();
      }
      subscription.unsubscribe();
    });
  }

  toEvalueteSurgery(event) {
    this.mainEvaluation = event;
    if(this.mainEvaluation == 5) {
      this.maximumRating = true;
      this.evalueteParams = false;
      for(let i = 0; i <= 2; i++) {
        this.toEvalueteParams(event, i);
      }
    }
    else{
      this.maximumRating = false;
      this.evalueteParams = true;
    }
  }

  toEvalueteParams(event, index) {
    if(index == 0) {
      this.evaluationGrade.hospitalRating = event;
    } else if (index == 1) {
      this.evaluationGrade.surgeonRating = event;
    } else if(index == 2) {
      this.evaluationGrade.attendanceRating = event;
    }
    this.calculateAverage();
  }

  calculateAverage() {
    this.mainEvaluation = Math.floor((this.evaluationGrade.hospitalRating
      + this.evaluationGrade.surgeonRating
      + this.evaluationGrade.attendanceRating) / 3);
  }

  confirm() {
    if (this.mainEvaluation != 0) {
      const subscription = this.evaluationService.sendSurgeryEvaluation(this.idSurgeryPerformed, this.evaluationGrade)
        .subscribe(
          response => {
            this.evaluationModal = false;
          },
          () => this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000})
        )
      this.subscriptions.push(subscription);
    } else {
      this.snackBar.open('É preciso avaliar antes de confirmar.', 'Ok', {duration: 3000});
    }
  }

  hideModal() {
    this.evaluationModal = false;
  }

  getIdSurgeryPerformed() {
    const subscription = this.evaluationService.getSurgeryId().subscribe(
      surgeryPerformed => {
        this.idSurgeryPerformed = surgeryPerformed?.data.code;
        if(this.idSurgeryPerformed != null)
          this.evaluationModal = true;
      },
      (err) => {
          this.snackBar.open('Algo deu errado, por favor, tente novamente mais tarde.', 'Ok', {duration: 3000});
      }
    )
    this.subscriptions.push(subscription);
  }

}
