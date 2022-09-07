import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, Observable, switchMap, throwError} from 'rxjs'
import {AuthService} from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshed = false

  constructor(public authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    })

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !this.refreshed
        ) {
          this.refreshed = true
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              return next.handle(
                req.clone({
                  withCredentials: true,
                })
              )
            })
          )
        }
        this.refreshed = false
        return throwError(() => error)
      })
    )
  }
}
