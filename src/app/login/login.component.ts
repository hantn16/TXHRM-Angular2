import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenService } from '../core/services/authen.service';
import { NotificationService } from '../core/services/notification.service';
import { UtilityService } from '../core/services/utility.service';
import { UrlConstants } from '../core/common/url.constants';
import { MessageConstants } from '../core/common/message.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService,
    private router: Router
  ) { }

  model: any = {};
  loading = false;
  ngOnInit() {
  }
  login() {
    this.loading = true;
    this._authenService.login(this.model.username, this.model.password).subscribe(
      data => {
        this._notificationService.printSuccessMessage('Đăng nhập thành công');
        this.router.navigate([UrlConstants.HOME]);
      }, error => {
        this._notificationService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
        this.loading = false;
      }
    );
  }
}
