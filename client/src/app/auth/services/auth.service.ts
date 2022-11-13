import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {AuthRequestInterface} from 'src/app/auth/types/authRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {environment} from 'src/environments/environment'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userData: AuthRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/register'
    return this.http.post<CurrentUserInterface>(url, userData)
  }

  login(userData: AuthRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/login'
    return this.http.post<CurrentUserInterface>(url, userData)
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth'
    return this.http.get<CurrentUserInterface>(url)
  }
}
