import { PersonRequest } from '../../models/person/person-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private url = `${environment.api}/create/new-user`;

  constructor(
    private http: HttpClient
  ) { }

  getPersons() : Observable<PersonRequest> {
    return this.http.get<PersonRequest>(this.url);
  }

  createPersons(person: PersonRequest) : Observable<PersonRequest> {
    return this.http.post<PersonRequest>(this.url, person);
  }
}
