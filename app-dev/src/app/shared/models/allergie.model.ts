export interface AllergyListModel {
  count: number;
  rows: AllergyModel[];
}

export interface AllergyModel {
  code: string;
  description: string;
}
