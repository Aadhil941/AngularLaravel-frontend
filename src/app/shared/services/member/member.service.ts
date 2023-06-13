import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../models/member.model';
import { BehaviorSubject, Observable, Subject, catchError, finalize, map, of } from 'rxjs';
import { environment } from './../../../../environments/environment.development';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  reloadData$ = new Subject<any>();
  constructor(private _httpClient: HttpClient) { }

  getMembers(): Observable<any> {
    let url = environment.BASE_URL + '/api/get-members';
    let token = localStorage.getItem('project_access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      })
    };

    return this._httpClient.get<any>(url, httpOptions);
  }

  postMember(data: Member): Observable<any> {
    let url = environment.BASE_URL + '/api/add-member';
    let token = localStorage.getItem('project_access_token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      })
    };

    return this._httpClient.post<any>(url, data, httpOptions);
  }

  getRelatedData(
    paginate = 1, sortBy = 'id', sortOrder = 'desc',
    pageNumber = 0, pageSize = 10): Observable<Member[]> {
    const token = localStorage.getItem('project_access_token');

    return this._httpClient.get(environment.BASE_URL + '/api/get-members', {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + token),
      params: new HttpParams()
        .set('paginate', paginate)
        .set('sortBy', sortBy)
        .set('sortOrder', sortOrder)
        .set('page', (pageNumber + 1).toString())
        .set('perPage', pageSize.toString())
    }).pipe(
      map((res: any) => res["data"])
    );
  }
}

export class MemberSource implements DataSource<Member> {

  private subject = new BehaviorSubject<Member[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private _memberService: MemberService) { }

  connect(collectionViewer: CollectionViewer): Observable<Member[]> {
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }

  getAllData(paginate: number, sortBy: string, sortDirection: string, pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this._memberService.getRelatedData(paginate, sortBy, sortDirection,
      pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe({
        next: (result: any) => {
          this.subject.next(result['data'])
          this.countSubject.next(result['total']);
        }
      })
  }
}
