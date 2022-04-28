export interface MedicationListModel {
  count: number;
  rows: MedicationModel[]
}

export interface MedicationModel {
  id: string,
  description: string
}
