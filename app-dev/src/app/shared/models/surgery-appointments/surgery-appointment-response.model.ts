import { MedicationModel } from './../medication.model';
import { HospitalModel } from "../hospital.model";
import { PatientModel } from "../patient.model";
import { SurgeonModel } from "../surgeon.model";
import { TimetableModel } from "../timetable.model";
import { SurgeryModel } from "../surgery.model";
import { AllergyModel } from "../allergie.model";
import { NurseReport } from '../nuser.report.model';

export interface SurgeryAppointmentResponseModel {
  code: string;
  createdAt: string;
  description: string;
  hospital: HospitalModel;
  hospitalId: number;
  patient: PatientModel;
  patientId: number;
  birthDate?: string;
  height?: string;
  weight?: string;
  medicalReport?: any;
  bloodGroup: string;
  status: string;
  surgeon: SurgeonModel;
  surgeonId: number;
  surgery: SurgeryModel;
  surgeryId: number;
  timetable: TimetableModel;
  timetableId: number;
  updatedAt: string;
  lastStatusModificationDate: string;
  step: string;
  riskRatings: RiskRatings[];
  price?: number;
  nurseReport?: NurseReport[];
  attachments: Attachments[];
  allergies: {
    allergyId: number,
    allergy: AllergyModel
  }[];
  medications: {
    medicationId: number,
    medication: MedicationModel[]
  }[];
}

export interface RiskRatings {
  seq: number;
  detail: string;
  description?: string;
}

export interface Attachments {
  seq: number;
  code: string;
  filename: string;
}
