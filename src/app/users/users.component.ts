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
users:IdentityUser[];
modalRef:any;
editing:boolean=false;
newUser:ManageUserRolesViewModel=new ManageUserRolesViewModel();
submitting:boolean=false;
  constructor(private service:ApiService) { }

  ngOnInit() {
this.getAllUsers();
  }
  getAllUsers(){
    if(this.canViewUsers()){
      this.service.getAllUsers().subscribe(resulte=>{
        console.log(resulte);

        this.users=resulte;
      })

    }
  }
  save(){
    this.submitting=true
    console.log(this.newUser);
if(this.editing){
this.editUser();
}
// else{
//   this.addUser();
// }

  }
  canEditUsers():boolean{
    return UserConstant.hasPermission("Permission.Users.Edit");
  }
  editUser(){

    this.service.updateUserRoles(this.newUser).subscribe(result=>{
      this.getAllUsers();
      this.modalRef.hide();
      this.submitting=false;
      this.editing=false;
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
  canViewUsers():boolean{
    return UserConstant.hasPermission("Permission.Users.View");
  }
  showModal(modal: any,user?:IdentityUser){

    //this.getParents(this.AccountsTree);
    this.getUserRoles(user?.userId);
    if(user){
      this.editing=true;
    }
    this.modalRef= modal
    this.modalRef.show();
  }

  getUserRoles(userId?:string){
    this.service.getUserRoles(userId).subscribe(result=>{
      this.newUser=result;

      console.log("editing user"+this.newUser.userName);

    })

  }

  delete(user:IdentityUser){

  }


}
