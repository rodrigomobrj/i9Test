

export interface SurgeonOrHospital {
  code: string;
  description: string;
  name: string;
  photo: string;
  rating: number;
  speciality: string;
  surgeryCode: string;
  surgeryName: string;
  totalAssessment: number;
  whereOrWhoAttend: Details[];
}

export interface Details {
  minPrice: string;
  maxPrice: string;
  name: string;
  rating: number;
}



