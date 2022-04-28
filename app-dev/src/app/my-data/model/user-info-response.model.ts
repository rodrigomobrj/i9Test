import {PersonResponseModel} from "../../shared/models/person/person-response.model";

export interface UserInfoResponseModel {
  birthDate: string;
  docNum: string;
  education: string;
  gender: string;
  height: string;
  id: string;
  occupation: string;
  person: PersonResponseModel;
  weight: string;
  workingAt: string;
}
