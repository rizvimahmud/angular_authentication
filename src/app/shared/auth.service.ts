import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cookies } from '../types/cookies';
import { User, UserDocument } from '../types/user';

interface ErrorResponse {
  status?: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `${environment.baseUrl}/user`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  signUp(
    user: Pick<UserDocument, 'email' | 'name' | 'password'>
  ): Observable<any> {
    let signupUrl = `${this.authUrl}/signup`;
    return this.http.post(signupUrl, user, this.httpOptions).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.getCurrentuser().subscribe((res: any) => {
          this.setUser(res.user);
          return user;
        });
      }),
      catchError(this.handleError)
    );
  }

  login(user: Pick<UserDocument, 'email' | 'password'>) {
    let loginUrl = `${this.authUrl}/login`;
    return this.http.post(loginUrl, user, this.httpOptions).pipe(
      tap((res: any) => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.getCurrentuser().subscribe((res: any) => {
          this.setUser(res.user);
          return user;
        });
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.http
      .get(this.authUrl, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.clearTokens();
        this.currentUserSubject.next(null!);
        this.router.navigate(['/login']);
      });
  }

  getCurrentuser() {
    return this.http.get(this.authUrl, this.httpOptions).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  refreshToken() {
    const refreshTokenurl = `${this.authUrl}/refresh`;
    return this.http
      .get(this.authUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getToken(name: string) {
    return localStorage.getItem(Cookies.Access);
  }

  setTokens(access: string, refresh?: string) {
    localStorage.setItem(Cookies.Access, access);
    if (refresh) {
      localStorage.setItem(Cookies.Refresh, refresh);
    }
  }

  clearTokens() {
    localStorage.removeItem(Cookies.Access);
    localStorage.removeItem('user');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  isLoggedIn() {
    const token = this.getToken(Cookies.Access);
    return token ? true : false;
  }

  getUserRoles() {
    const user = localStorage.getItem('user');
    if (user) {
      let roles = JSON.parse(user).roles;
      return roles;
    }
    return [];
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: ErrorResponse = {} as ErrorResponse;

    errorResponse['status'] = response.status;
    errorResponse['message'] = response.error.error;

    console.error(`Error: ${errorResponse.message}`);
    return throwError(() => errorResponse);
  }
}
