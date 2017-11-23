import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _authenService: AuthenService, private _utilityService: UtilityService) { }

  ngOnInit() {
    // $.getScript('../assets/js/custom.js');
  }
  logout() {
    this._authenService.logout();
    this._utilityService.navigateToLogin();
  }
}
