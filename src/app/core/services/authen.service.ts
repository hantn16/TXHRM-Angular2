import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import 'rxjs/add/operator/map';
import { LoggedUser } from '../domain/logged-user';
import { Body } from '@angular/http/src/body';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }
  login(username: string, password: string) {
    const body2 = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;
    const header: Headers = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: header });
    return this._http.post(SystemConstants.BASE_API + 'api/oauth/token', body2, options)
      .map((res: Response) => {
        const user: LoggedUser = res.json();
        if (user && user.access_token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        }
      });
  }
  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }
  isUserAuthenticated(): boolean {
    const userStr = localStorage.getItem(SystemConstants.CURRENT_USER);
    return (userStr != null ? true : false);
  }
  getLoggedUser(): any {
    let user: LoggedUser;
    if (this.isUserAuthenticated()) {
      const loggedUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedUser(loggedUser.access_token, loggedUser.username, loggedUser.fullName, loggedUser.Email, loggedUser.Avatar);
    } else {user = null; }
    return user;
  }
}
