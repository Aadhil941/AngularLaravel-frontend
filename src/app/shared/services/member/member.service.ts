import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../models/member.model';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _httpClient: HttpClient) { }

  postMember(data: Member): Observable<any> {
    let url = environment.BASE_URL + '/api/add-member';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this._httpClient.post<any>(url, data, httpOptions);
  }
}
