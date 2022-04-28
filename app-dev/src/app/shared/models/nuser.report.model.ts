export interface NurseReport {
  assessment: string;
  notes: string;
  reporter: Reporter;
}

export interface Reporter {
  code: string;
  fullName: string;
}
