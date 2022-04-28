
export interface FaceToFaceSchedulingModel {
  profileCode: string;
  timetableCode: string;
  dateRef: string;
  typeProfile: 'hospitals' | 'surgeons';
  surgeryAppointmentCode: string;
}
