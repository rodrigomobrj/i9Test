
export interface searchModel {
  surgeon?: SurgeonModel;
  hospital?: HospitalModel;
  totalAssessment: number;
  rating: number;
  minPrice: string;
  maxPrice: string;
  surgery: SurgeryModel;
}

interface SurgeonModel {
  code: string;
  fullName: string;
  speciality: string;
}

interface HospitalModel {
  code: string;
  name: string;
  speciality: string;
}

interface SurgeryModel {
  name: string;
}
