
export interface SurgeonSearchRequestModel {
  minPrice: number;
  maxPrice: number;
  surgeryCode: string;
  bestRating: boolean;
  name?: string;
}
