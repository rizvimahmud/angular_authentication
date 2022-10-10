import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs'
import {environment} from 'src/environments/environment'
import {Cookies} from '../types/cookies'
import {ErrorResponse} from '../types/errorResponse.interface'
import {User} from '../types/user.interface'
import {UserLoginRequest} from '../types/userLoginRequest.interface'
import {UserSignupRequest} from '../types/userSignupRequest.interface'

@Injectable()
export class AuthService {
  authUrl = `${environment.baseUrl}/user`
  private currentUserSubject: BehaviorSubject<User | null>
  public currentUser$: Observable<User | null>

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private http: HttpClient, public router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.getUserFromLocalStorage('user')
    )
    this.currentUser$ = this.currentUserSubject.asObservable()
  }

  signUp(user: UserSignupRequest): Observable<any> {
    let signupUrl = `${this.authUrl}/signup`
    return this.http.post(signupUrl, user).pipe(catchError(this.handleError))
  }

  login(user: UserLoginRequest): Observable<User> {
    let loginUrl = `${this.authUrl}/login`
    return this.http.post<User>(loginUrl, user, this.httpOptions).pipe(
      tap((res: any) => {
        this.setUser(res.user)
      }),
      catchError(this.handleError)
    )
  }

  logout() {
    let logoutUrl = `${this.authUrl}/logout`
    this.http
      .get(logoutUrl, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe(() => {
        this.clearTokens()
        this.currentUserSubject.next(null!)
        this.router.navigateByUrl('/login')
      })
  }

  getCurrentuser(): Observable<User> {
    return this.http
      .get<User>(this.authUrl, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  refreshToken() {
    const refreshTokenurl = `${this.authUrl}/refresh`
    return this.http
      .get(refreshTokenurl, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  uploadProfilePicture(file: any) {
    const uploadAvatarUrl = `${this.authUrl}/upload`
    return this.http.post(uploadAvatarUrl, file, {
      headers: {},
    })
  }

  getUserFromLocalStorage(key: string) {
    const token = localStorage.getItem(key)
    if (token) {
      return JSON.parse(token)
    }
    return null
  }

  setTokens(access: string, refresh?: string) {
    localStorage.setItem(Cookies.Access, access)
    if (refresh) {
      localStorage.setItem(Cookies.Refresh, refresh)
    }
  }

  clearTokens() {
    localStorage.removeItem('user')
  }

  setUser(user: User | null): void {
    localStorage.setItem('user', JSON.stringify(user))
    this.currentUserSubject.next(user)
  }

  get isLoggedIn(): Boolean {
    const user = this.getUserFromLocalStorage('user')
    return user ? true : false
  }

  getUserRole() {
    const user = this.getUserFromLocalStorage('user')
    if (user) {
      let role = user.role
      return role
    }
    return ''
  }

  private handleError(response: HttpErrorResponse) {
    let errorResponse: ErrorResponse = {} as ErrorResponse

    errorResponse['status'] = response.status
    errorResponse['message'] = response.error.error

    console.error(`Error: ${errorResponse.message}`)
    return throwError(() => errorResponse)
  }
}
