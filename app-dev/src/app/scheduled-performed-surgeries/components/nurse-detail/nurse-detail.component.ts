import { Component, OnInit } from '@angular/core';
import {SurgeryAppointmentResponseModel} from "../../../shared/models/surgery-appointments/surgery-appointment-response.model";
import {Subscription} from "rxjs";
import {ScheduledDetailService} from "../../services/scheduled-detail/scheduled-detail.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {FileOpener} from "@ionic-native/file-opener/ngx";
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Component({
  selector: 'app-nurse-detail',
  templateUrl: './nurse-detail.component.html',
  styleUrls: ['./nurse-detail.component.scss'],
})
export class NurseDetailComponent implements OnInit {

  attachments: any[] = [];
  durationOnlineConsultation: number = 23;
  surgeryAppointment: SurgeryAppointmentResponseModel;
  assessment: string;
  notes: string;
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(
    private scheduledDetailService: ScheduledDetailService,
    private route: ActivatedRoute,
    private fileOpener: FileOpener,
  ) { }

  ngOnInit() {
    this.getScheduledDetail();
  }

  ionViewWillEnter() {
    this.getScheduledDetail();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  getScheduledDetail() {
    this.loading = true;
    const subscription = this.route.params.pipe(
      switchMap(params => {
        const codeSurgery = params.id;
        return this.scheduledDetailService.getScheduledDetail(codeSurgery);
      })
    ).subscribe(response => {
      this.loading = false;
      this.surgeryAppointment = response.data;
      this.attachments = response.data.attachments;
      response.data.nurseReport.forEach(data => {
        this.notes = data.notes;
        this.assessment = data.assessment;
      });
    });
    this.subscriptions.push(subscription);
  }

  getDownloadFile(code: string) {
    this.loading = true;
    const subscription = this.scheduledDetailService.getDownloadFile(code).subscribe(
      async response => {
        this.loading = false;
        await this.openFile(response.data);
      },
      (err) => {
        this.loading = false;
      }
    );
    this.subscriptions.push(subscription);
  }

  async openFile(data) {
    const savedFile = await Filesystem.writeFile({
      data: data.base64Content,
      path: `i9-${data.filename}`,
      directory: Directory.Documents,
    });
    const uriPath = savedFile.uri;
    const mineType = this.getMimeType(data.filename);
    this.fileOpener.showOpenWithDialog(uriPath, mineType).then(() => console.log('file open'));
  }

  getMimeType(fileName: string) {
    if (fileName.indexOf('pdf') >= 0) {
      return 'application/pdf';
    }
    if (fileName.indexOf('png') >= 0) {
      return 'image/png';
    }
    if (fileName.indexOf('jpg') >= 0) {
      return 'image/jpg';
    }
    if (fileName.indexOf('jpge') >= 0) {
      return 'image/jpge';
    }
  }

  downloadFile(file: Blob) {
    const anchor = window.document.createElement('a');
    anchor.href = window.URL.createObjectURL(file);
    anchor.download = 'export.jpg';
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
  }

  b64toBlob(b64Data, contentType): Blob {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: contentType});
  }

}
