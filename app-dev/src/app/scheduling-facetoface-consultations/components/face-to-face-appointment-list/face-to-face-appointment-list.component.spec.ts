import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FaceToFaceAppointmentListComponent } from './face-to-face-appointment-list.component';

describe('FaceToFaceAppointmentListComponent', () => {
  let component: FaceToFaceAppointmentListComponent;
  let fixture: ComponentFixture<FaceToFaceAppointmentListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceToFaceAppointmentListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FaceToFaceAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
