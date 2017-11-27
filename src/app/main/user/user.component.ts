import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public listUser: any[];
  public pageIndex = 1;
  public pageSize = 20;
  public totalRow;
  public pageDisplay = 10;
  public filter = '';

  // Property phần Add, Edit
  public user: any = {};
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  @ViewChild('avatar') avatar: any;
  public baseFolder: string = SystemConstants.BASE_API.substring(0, SystemConstants.BASE_API.length - 1);
  public myRoles: any[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[] = [];
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };


  constructor(private _dataService: DataService, private _notificationService: NotificationService,
    private _uploadService: UploadService) { }

  ngOnInit() {
    this.loadAllRoles();
    this.loadListUser();
  }
  loadAllRoles() {
    this._dataService.get(`api/approle/getlistall`)
      .subscribe((res) => {
        console.log(res);
        this.roles = res;
        this.allRoles = [];
        for (const item of res) {
          this.allRoles.push({ id: item.Name, name: item.Description });
        }
      });
  }
  loadListUser() {
    this._dataService.get(`api/appuser/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
      .subscribe((res: any) => {
        console.log(res);
        this.listUser = res.Items;
        this.totalRow = res.TotalRows;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
      });
  }
  getUserById(id: any): any {
    this._dataService.get(`api/appuser/detail/${id}`)
      .subscribe((res: any) => {
        this.user = res;
        this.myRoles = [];
        for (const role of this.user.Roles) {
          this.myRoles.push(role);
        }
        const test = moment(this.user.BirthDay, 'DD/MM/YY hh:mm:ss tt');
        this.user.BirthDay = moment(this.user.BirthDay, 'DD/MM/YY hh:mm:ss tt').format('DD/MM/YYYY');
        console.log(this.user.BirthDay);
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadListUser();
  }
  showAddModal() {
    this.user = {};
    this.addEditModal.show();
  }
  showEditModal(id: any) {
    this.getUserById(id);
    this.addEditModal.show();
  }
  saveChanges(isValid: boolean) {
    if (isValid) {
      this.user.Roles = this.myRoles;
      const fi = this.avatar.nativeElement;
      if (fi.files.length > 0) {
        this._uploadService.postWithFile(`api/upload/saveimage?type=${'avatar'}`, null, fi.files)
          .then((imgUrl: string) => { this.user.Avatar = imgUrl; })
          .then(() => this.saveData());
      } else { this.saveData(); }
    }
  }
  saveData() {
    if (this.user.Id === undefined) { // Nếu ID undefined thì là thêm mới role
      const body = JSON.stringify(this.user);
      this._dataService.post('api/appuser/add', body).subscribe((res: any) => {
        this.addEditModal.hide();
        this.loadListUser();
        this._notificationService.printSuccessMessage(MessageConstants.CREATED_MSG_OK);
      }, (err) => this._dataService.handleError(err));
    } else { // Còn không là sửa role
      const body = JSON.stringify(this.user);
      this._dataService.put('api/appuser/update', body).subscribe((res: any) => {
        this.addEditModal.hide();
        this.loadListUser();
        this._notificationService.printSuccessMessage(MessageConstants.UPDATED_MSG_OK);
      }, (err) => this._dataService.handleError(err));
    }
  }
  deleteUser(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG,
      () => {
        this._dataService.delete(`api/appuser/delete`, 'id', id).subscribe((res) => {
          this.loadListUser();
          this._notificationService.printSuccessMessage(MessageConstants.DELETED_MSG_OK);
        });
      });
  }

  selectGender(event) {
    this.user.Gender = event.target.value;
  }
  public selectedDate(value: any) {
    this.user.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }
}
