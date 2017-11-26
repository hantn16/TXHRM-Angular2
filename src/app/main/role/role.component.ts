import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap';




@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public listRole: any[];
  public pageIndex = 1;
  public pageSize = 20;
  public totalRow;
  public pageDisplay = 10;
  public filter = '';

  // Property phần Add, Edit
  public role: any = {};
  @ViewChild('addEditModal') public addEditModal: ModalDirective;


  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadListRole();
  }
  loadListRole() {
    this._dataService.get(`api/approle/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
      .subscribe((res: any) => {
        console.log(res);
        this.listRole = res.Items;
        this.totalRow = res.TotalRows;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
      });
  }
  getRoleById(id: any) {
    this._dataService.get(`api/approle/detail/${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.role = res;
      });
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadListRole();
  }
  showAddModal() {
    this.role = {};
    this.addEditModal.show();
  }
  showEditModal(id: any) {
    this.role = this.getRoleById(id);
    this.addEditModal.show();
  }
  saveChanges(isValid: boolean) {
    if (isValid) {
      if (this.role.Id === undefined) { // Nếu ID undefined thì là thêm mới role
        const body = JSON.stringify(this.role);
        this._dataService.post('api/approle/add', body).subscribe((res: any) => {
          this.addEditModal.hide();
          this.loadListRole();
          this._notificationService.printSuccessMessage(MessageConstants.CREATED_MSG_OK);
        }, (err) => this._dataService.handleError(err));

      } else { // Còn không là sửa role
        const body = JSON.stringify(this.role);
        this._dataService.put('api/approle/update', body).subscribe((res: any) => {
          this.addEditModal.hide();
          this.loadListRole();
          this._notificationService.printSuccessMessage(MessageConstants.UPDATED_MSG_OK);
        }, (err) => this._dataService.handleError(err));
      }
    }
  }
  showConfirmDialog(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteAfterConfirm);
  }
  deleteAfterConfirm(id: any) {
    this._dataService.delete(`api/approle/delete`, 'id', id).subscribe((res) => {
      this._notificationService.printSuccessMessage(MessageConstants.DELETED_MSG_OK);
    });
  }
  deleteRole(id: any) {
    this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG,
      () => {
        this._dataService.delete(`api/approle/delete`, 'id', id).subscribe((res) => {
          this.loadListRole();
          this._notificationService.printSuccessMessage(MessageConstants.DELETED_MSG_OK);
        });
      });
  }
}
