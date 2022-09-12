import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = `${environment.baseUrl}/users`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.userUrl, this.httpOptions)
  }

  deleteUser(userId: string) {
    const deleteUserUrl = `${this.userUrl}/${userId}`
    return this.http.delete(deleteUserUrl, this.httpOptions)
  }

  activateUser(userId: string) {
    const activateUserUrl = `${this.userUrl}/activate`
    return this.http.put(activateUserUrl, {id: userId}, this.httpOptions)
  }

  deactivateUser(userId: string) {
    const deactivateUserUrl = `${this.userUrl}/deactivate`
    return this.http.put(deactivateUserUrl, {id: userId}, this.httpOptions)
  }

  getUserWithoutAdmin() {
    const usersWithoutAdminUrl = `${this.userUrl}/super`
    return this.http.get(usersWithoutAdminUrl, this.httpOptions)
  }
}
