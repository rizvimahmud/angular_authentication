import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {environment} from 'src/environments/environment'

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

  getAllUsers(
    offset: number = this.defaultOffset,
    limit: number = this.defaultLimit,
    name: string = ''
  ) {
    return this.http.get(this.userUrl, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
        .set('name', name),
      headers: this.getHttpHeaders(),
    })
  }

  deleteUser(userId: string) {
    const deleteUserUrl = `${this.userUrl}/${userId}`
    return this.http.delete(deleteUserUrl, {headers: this.getHttpHeaders()})
  }

  handleUserVerification(userId: string, status: 'activate' | 'deactivate') {
    const verificationUrl = `${this.userUrl}/${userId}`

    return this.http.put(
      verificationUrl,
      {status},
      {headers: this.getHttpHeaders()}
    )
  }

  getRegularUsers(
    offset: number = this.defaultOffset,
    limit: number = this.defaultLimit,
    name = ''
  ) {
    const getRegularUsers = `${this.userUrl}/super`
    return this.http.get(getRegularUsers, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
        .set('name', name),
      headers: this.getHttpHeaders(),
    })
  }
}
