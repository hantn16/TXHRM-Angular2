import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthenService } from '../services/authen.service';
import { NotificationService } from '../services/notification.service';
import { UtilityService } from '../services/utility.service';
import { SystemConstants } from '../common/system.constants';
import { MessageConstants } from '../common/message.constants';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private _http: Http, private _router: Router, private _authenService: AuthenService,
    private _notificationService: NotificationService, private _utilityService: UtilityService
  ) { }
  private getAuthorizedHeader(): Headers {
    const header = new Headers();
    header.append('Authorization', 'Bearer ' + this._authenService.getLoggedUser().access_token);
    return header;
  }
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  get(uri: string) {
    const header = this.getAuthorizedHeader();
    header.append('Content-Type', 'application/json');
    return this._http.get(SystemConstants.BASE_API + uri, { headers: header })
      .map((res: Response) => this.extractData(res));
  }
  post(uri: string, data?: any) {
    const header = this.getAuthorizedHeader();
    header.append('Content-Type', 'application/json');
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: header })
      .map((res: Response) => this.extractData(res));
  }
  put(uri: string, data?: any) {
    const header = this.getAuthorizedHeader();
    header.append('Content-Type', 'application/json');
    return this._http.put(SystemConstants.BASE_API + uri, data, { headers: header })
      .map((res: Response) => this.extractData(res));
  }
  delete(uri: string, key: string, id: string) {
    const header = this.getAuthorizedHeader();
    header.append('Content-Type', 'application/json');
    return this._http.delete(`${SystemConstants.BASE_API + uri}/?${key}=${id}`, { headers: header })
      .map((res: Response) => this.extractData(res));
  }
  postFile(uri: string, data?: any) {
    const header = this.getAuthorizedHeader();
    return this._http.post(SystemConstants.BASE_API + uri, data, { headers: header })
      .map((res: Response) => this.extractData(res));
  }
  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    } else {
      const errMsg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống';
      this._notificationService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }
}
