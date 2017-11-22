import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../common/system.constants';
import 'rxjs/add/operator/map';
import { LoggedUser } from '../domain/logged-user';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }
  login(username: string, password: string) {
    // tslint:disable-next-line:prefer-const
    let body = { username: encodeURIComponent(username), password: encodeURIComponent(password), grant_type: 'password' };
    // tslint:disable-next-line:prefer-const
    let body2 = '?grant_type=password&username=' + encodeURIComponent(username) + '&password=' + password;
    // tslint:disable-next-line:prefer-const
    let header: Headers = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    // tslint:disable-next-line:prefer-const
    let options = new RequestOptions({ headers: header });
    return this._http.post(SystemConstants.BASE_API + 'api/oauth/token', body, options)
      .map((res: Response) => {
        // tslint:disable-next-line:prefer-const
        let user: LoggedUser = res.json();
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
    // tslint:disable-next-line:prefer-const
    let userStr = localStorage.getItem(SystemConstants.CURRENT_USER);
    return (userStr != null ? true : false);
  }
  getLoggedUser(): any {
    let user: LoggedUser;
    if (this.isUserAuthenticated()) {
      // tslint:disable-next-line:prefer-const
      let loggedUser = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedUser(loggedUser.access_token, loggedUser.username, loggedUser.fullName, loggedUser.Email, loggedUser.Avatar);
    // tslint:disable-next-line:curly
    } else user = null;
    return user;
  }
}
