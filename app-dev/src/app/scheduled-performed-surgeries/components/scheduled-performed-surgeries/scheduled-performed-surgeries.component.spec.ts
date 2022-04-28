import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScheduledPerformedSurgeriesComponent } from './scheduled-performed-surgeries.component';

describe('ScheduledPerformedSurgeriesComponent', () => {
  let component: ScheduledPerformedSurgeriesComponent;
  let fixture: ComponentFixture<ScheduledPerformedSurgeriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledPerformedSurgeriesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledPerformedSurgeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
