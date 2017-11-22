import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor() { }
  departments: any[] = [
    { ID: 1, Name: 'Bộ phận Văn Phòng', ParentDepartment: {}, Leader: { ID: 1, Name: 'Trần Quang Hiện' }, Status: true },
    { ID: 2, Name: 'Bộ phận Sản Xuất', ParentDepartment: {}, Leader: { ID: 2, Name: 'Đinh Thế Giới' }, Status: true },
    // tslint:disable-next-line:max-line-length
    { ID: 3, Name: 'Phòng Nhân Sự', ParentDepartment: { Name: 'Bộ phận Văn Phòng' }, Leader: { ID: 3, Name: 'Dương Quốc Bình' }, Status: true },
    { ID: 4, Name: 'Phòng TC-KT', ParentDepartment: { Name: 'Bộ phận Văn Phòng' }, Leader: { ID: 4, Name: 'Nguyễn Tấn Phát' }, Status: true },
    { ID: 5, Name: 'Tổ kỹ thuật', ParentDepartment: { Name: 'Bộ phận Sản Xuất' }, Leader: { ID: 5, Name: 'Nguyễn Thế Công' }, Status: true }
  ];
  ngOnInit() {
  }

}
