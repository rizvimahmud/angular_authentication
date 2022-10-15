import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { UsersResponse } from './userResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = `${environment.baseUrl}/users`
  defaultOffset = 0
  defaultLimit = 0

  getHttpHeaders(headers?: HttpHeaders) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...headers,
    })
  }

  constructor(private http: HttpClient) {}

  getUsers(
    offset: number = this.defaultOffset,
    limit: number = this.defaultLimit,
    name: string = ''
  ): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(this.userUrl, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
        .set('name', name),
      headers: this.getHttpHeaders(),
    })
  }

  deleteUser(userId: string) {
    const deleteUserUrl = `${this.userUrl}/${userId}`
    return this.http.delete(deleteUserUrl, { headers: this.getHttpHeaders() })
  }

  handleUserVerification(userId: string, status: 'activate' | 'deactivate') {
    const verificationUrl = `${this.userUrl}/${userId}`

    return this.http.put(
      verificationUrl,
      { status },
      { headers: this.getHttpHeaders() }
    )
  }
}
