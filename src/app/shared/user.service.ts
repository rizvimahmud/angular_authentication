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
    limit: number = this.defaultLimit
  ) {
    return this.http.get(this.userUrl, {
      params: new HttpParams().set('offset', offset).set('limit', limit),
      headers: this.getHttpHeaders(),
    })
  }

  deleteUser(userId: string) {
    const deleteUserUrl = `${this.userUrl}/${userId}`
    return this.http.delete(deleteUserUrl, {headers: this.getHttpHeaders()})
  }

  activateUser(userId: string) {
    const activateUserUrl = `${this.userUrl}/activate`
    return this.http.put(
      activateUserUrl,
      {id: userId},
      {headers: this.getHttpHeaders()}
    )
  }

  deactivateUser(userId: string) {
    const deactivateUserUrl = `${this.userUrl}/deactivate`
    return this.http.put(
      deactivateUserUrl,
      {id: userId},
      {headers: this.getHttpHeaders()}
    )
  }

  getRegularUsers(
    offset: number = this.defaultOffset,
    limit: number = this.defaultLimit
  ) {
    const getRegularUsers = `${this.userUrl}/super`
    return this.http.get(getRegularUsers, {
      params: new HttpParams().set('offset', offset).set('limit', limit),
      headers: this.getHttpHeaders(),
    })
  }
}
