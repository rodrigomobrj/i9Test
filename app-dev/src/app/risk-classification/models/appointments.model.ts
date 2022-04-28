import { Surgerie } from './../../new-surgery/models/surgerie.model';
import { SurgeonModel } from './../../shared/models/surgeon.model';
import { RiskRating } from './riskRating.model';
import { PatientModel } from './../../shared/models/patient.model';
import { MedicationListModel as MedicationListModel } from './../../shared/models/medication.model';
import { AllergyListModel as AllergyModel } from './../../shared/models/allergie.model';
import { TimetableModel } from 'src/app/shared/models/timetable.model';
export interface Appointments {
  code?: string;
  status?: string;
  step: string;
  surgeonCode?: string;
  hospitalCode?: string;
  timetableCode?: string;
  surgeryCode?: string;
  description?: string;
  medicationCodes?: string[];
  allergyCodes?: string[];
  riskRatings?: string[];
  attachments?: AttachmentModel[];
  additionalInformationChecked?: boolean;
  riskRatingsChecked?: boolean;
  scheduleDate?: string;
}

export interface AttachmentModel {
  filename?: string;
  attachment?: string;
}
