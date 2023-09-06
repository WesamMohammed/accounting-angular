import { ApiService } from './../SharedService/api.service';
import { Component, OnInit } from '@angular/core';
import { UserConstant } from 'src/Constants/UserConstant';
import { IdentityRole, ManageRolePermissionsViewModel } from '../Models/Role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  modalRef?: any;
  constructor(private service:ApiService) { }
  roles:IdentityRole[];
  newRole:ManageRolePermissionsViewModel=new ManageRolePermissionsViewModel();
  submitting:boolean=false;
  editing:boolean=false;
  ngOnInit() {
this.getAllRoles();
  }
  getAllRoles(){
    if(this.canViewRoles()){
      this.service.getAllRoles().subscribe(resulte=>{
        console.log(resulte);

        this.roles=resulte;
      })

    }
  }
  save(){
    this.submitting=true
    console.log(this.newRole);
if(this.editing){
this.editRole();
}
else{
  this.addRole();
}

  }
  editRole(){

    this.service.updateRolePermissions(this.newRole).subscribe(result=>{
      this.getAllRoles();
      this.modalRef.hide();
      this.submitting=false;
      this.editing=false;
    })
  }
  addRole(){
    this.service.addRole(this.newRole).subscribe(result=>{
      this.getAllRoles();
      this.modalRef.hide();
      this.submitting=false;

    },err=>{
      this.submitting=false;
    })

  }
  delete(role:IdentityRole){}
  canViewRoles():boolean{


    return UserConstant.hasPermission("Permission.Roles.View");
  }
  showModal(modal: any,role?:IdentityRole){
    this.editing=false
    this.getRolePermissions(role?.roleId);
    if(role){
      this.editing=true;
    }
    //this.getParents(this.AccountsTree);
    this.modalRef= modal
    this.modalRef.show();
  }
  getRolePermissions(roleId?:string){
    this.service.getRolePermissions(roleId).subscribe(result=>{
      this.newRole=result;

      console.log("editing role"+this.newRole.roleName);

    })

  }

}
