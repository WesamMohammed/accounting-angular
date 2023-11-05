import { ApiService } from './../SharedService/api.service';
import { UserConstant } from 'src/Constants/UserConstant';
import { Component, OnInit } from '@angular/core';
import { IdentityUser, ManageUserRolesViewModel } from '../Models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IdentityUser[];
  modalRef: any;
  editing: boolean = false;
  newUser: ManageUserRolesViewModel = new ManageUserRolesViewModel();
  submitting: boolean = false;
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    if (this.canViewUsers()) {
      this.service.getAllUsers().subscribe(resulte => {
        console.log(resulte);

        this.users = resulte;
      })

    }
  }
  save() {
    this.submitting = true
    console.log(this.newUser);
    if (this.editing) {
      this.editUser();
    }
    // else{
    //   this.addUser();
    // }

  }
  canEditUsers(): boolean {
    return UserConstant.hasPermission("Permission.Users.Edit");
  }
  editUser() {

    this.service.updateUserRoles(this.newUser).subscribe(result => {
      this.getAllUsers();
      this.modalRef.hide();
      this.submitting = false;
      this.editing = false;
    })
  }
  // addUser(){
  //   this.service.addRole(this.newUser).subscribe(result=>{
  //     this.getAllUsers();
  //     this.modalRef.hide();
  //     this.submitting=false;

  //   },err=>{
  //     this.submitting=false;
  //   })

  // }
  canViewUsers(): boolean {
    return UserConstant.hasPermission("Permission.Users.View");
  }
  showModal(modal: any, user?: IdentityUser) {

    //this.getParents(this.AccountsTree);
    this.getUserRoles(user?.userId);
    if (user) {
      this.editing = true;
    }
    this.modalRef = modal
    this.modalRef.show();
  }

  getUserRoles(userId?: string) {
    this.service.getUserRoles(userId).subscribe(result => {
      this.newUser = result;

      console.log("editing user" + this.newUser.userName);

    })

  }

  delete(user: IdentityUser) {

  }


}


[
  { "children": [{ "children": [{ "children": [{ "children": [], "id": 9, "name": "وسام", "accountNumber": 1110001, "isSub": true, "parentId": 8, "appearIn": 1, "accountType": 3 }], "id": 8, "name": "المدينون", "accountNumber": 111, "isSub": false, "parentId": 7, "appearIn": 1, "accountType": 3 }, { "children": [{ "children": [], "id": 11, "name": "الصندوق الرئيسي", "accountNumber": 1120001, "isSub": true, "parentId": 10, "appearIn": 1, "accountType": 2 }], "id": 10, "name": "النقدية", "accountNumber": 112, "isSub": false, "parentId": 7, "appearIn": 1, "accountType": 2 }, { "children": [{ "children": [], "id": 16, "name": "المخزون السلعي", "accountNumber": 1130001, "isSub": true, "parentId": 15, "appearIn": 1, "accountType": 0 }], "id": 15, "name": "المخزون", "accountNumber": 113, "isSub": false, "parentId": 7, "appearIn": 1, "accountType": 0 }], "id": 7, "name": "الأصول المتداولة", "accountNumber": 11, "isSub": false, "parentId": 1, "appearIn": 1, "accountType": 0 }], "id": 1, "name": "الأصول", "accountNumber": 1, "isSub": false, "parentId": 0, "appearIn": 1, "accountType": 0 }, { "children": [{ "children": [{ "children": [], "id": 14, "name": " الدائنون الموردون", "accountNumber": 211, "isSub": false, "parentId": 12, "appearIn": 1, "accountType": 4 }], "id": 12, "name": "الخصوم المتداولة ", "accountNumber": 21, "isSub": false, "parentId": 2, "appearIn": 1, "accountType": 0 }, { "children": [], "id": 13, "name": "الدائنون", "accountNumber": 22, "isSub": false, "parentId": 2, "appearIn": 1, "accountType": 4 }], "id": 2, "name": "الخصوم", "accountNumber": 2, "isSub": false, "parentId": 0, "appearIn": 1, "accountType": 0 }, { "children": [{ "children": [], "id": 5, "name": "المبيعات", "accountNumber": 3, "isSub": true, "parentId": 3, "appearIn": 1, "accountType": 0 }], "id": 3, "name": "الإيرادات", "accountNumber": 3, "isSub": false, "parentId": 0, "appearIn": 0, "accountType": 0 }, {
     "children": [
      { "children": [], "id": 6, "name": "المشتريات", "accountNumber": 4, "isSub": true, "parentId": 4, "appearIn": 1, "accountType": 0 }
    ],
     "id": 4, "name": "المصروفات", "accountNumber": 4, "isSub": false, "parentId": 0, "appearIn": 0, "accountType": 0 }
    ]