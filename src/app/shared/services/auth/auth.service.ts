import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegister } from '../../models/user-register.model';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(private _httpClient: HttpClient) { }

  set projectAccessToken(token: string) {
    localStorage.setItem('project_access_token', token);
  }

  get projectAccessToken(): string {
    return localStorage.getItem('project_access_token') ?? '';
  }

  postUserData(data: UserRegister): Observable<any> {
    let url = environment.BASE_URL+'/api/signUp';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this._httpClient.post<any>(url, data, httpOptions);
  }

  signIn(data: any): Observable<any> {
    if (this._authenticated) {
      return throwError('User already logged in.');
    }
    const params: any = {
      'grant_type': 'password',
      'client_id': environment.client_id,
      'client_secret': environment.client_secret,
      'username': data.email,
      'password': data.password,
      'scope': '*',
    };
    return this._httpClient.post(environment.BASE_URL + '/oauth/token', params).pipe(
      switchMap((response: any) => {

        // Store the access token in the local storage
        // localStorage.setItem('project_access_token', response.access_token);
        this.projectAccessToken = response.access_token;

        // // Set the authenticated flag to true
        this._authenticated = true;

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('project_access_token');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  check(): Observable<boolean> {
    // Check the access token availability
    if (this.projectAccessToken) {
      return of(true);
    }

    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    return of(false);
    // return this.signInUsingToken();
  }

  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient.post('api/auth/refresh-access-token', {
      accessToken: this.projectAccessToken
    }).pipe(
      catchError(() =>

        // Return false
        of(false)
      ),
      switchMap((response: any) => {

        if (response) {
          // Store the access token in the local storage
          this.projectAccessToken = response.accessToken;

          // Set the authenticated flag to true
          this._authenticated = true;
        }

        // Return true
        return of(true);
      })
    );
  }
}
