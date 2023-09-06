import { UserConstant } from 'src/Constants/UserConstant';
import { ApiService } from './../SharedService/api.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit,QueryList,TemplateRef,ViewChildren } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener }
    from "@angular/material/tree";
import { Account } from '../Models/Accounts';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
interface Family {
  name: string;
  children?: Family[];
}


// interface Accounts{
//   Id:number;
//   Name:string;
//   ParentId:number
//   Children?:Accounts[];
// }
// const AccountsTree:Account[]=
// [
//   {
//       Id: 1,
//       Name: "الأصول",
//       ParentId: 0,
//       Children: [
//           {
//               Id: 5,
//               Name: "الأصول الثابتة",
//               ParentId: 1,
//               Children: []
//           },
//           {
//               Id: 6,
//               Name: "الأصول المتداولة",
//               ParentId: 1,
//               Children: [
//                   {
//                       Id: 7,
//                       Name: "العملاء",
//                       ParentId: 6,
//                       Children: [
//                           {
//                               Id: 11,
//                               Name: "وسام عميل",
//                               ParentId: 7,
//                               Children: []
//                           },
//                           {
//                               Id: 15,
//                               Name: "عميل2",
//                               ParentId: 7,
//                               Children: []
//                           },
//                           {
//                               Id: 16,
//                               Name: "عميل 3",
//                               ParentId: 7,
//                               Children: []
//                           },
//                           {
//                               Id: 25,
//                               Name: "عملاء مميزون",
//                               ParentId: 7,
//                               Children: []
//                           }
//                       ]
//                   },
//                   {
//                       Id: 8,
//                       Name: "الصناديق",
//                       ParentId: 6,
//                       Children: [
//                           {
//                               Id: 14,
//                               Name: "صندوق 1",
//                               ParentId: 8,
//                               Children: []
//                           },
//                           {
//                               Id: 17,
//                               Name: "صندوق وسام",
//                               ParentId: 8,
//                               Children: []
//                           },
//                           {
//                               Id: 18,
//                               Name: "2صندوق وسام",
//                               ParentId: 8,
//                               Children: []
//                           }
//                       ]
//                   },
//                   {
//                       Id: 9,
//                       Name: "البنوك",
//                       ParentId: 6,
//                       Children: [
//                           {
//                               Id: 20,
//                               Name: "بنك وسام",
//                               ParentId: 9,
//                               Children: []
//                           }
//                       ]
//                   },
//                   {
//                       Id: 10,
//                       Name: "المخزون",
//                       ParentId: 6,
//                       Children: []
//                   }
//               ]
//           }
//       ]
//   },
//   {
//       Id: 2,
//       Name: "الخصوم",
//       ParentId: 0,
//       Children: [
//           {
//               Id: 21,
//               Name: "الخصوم المتداولة",
//               ParentId: 2,
//               Children: []
//           }
//       ]
//   },
//   {
//       Id: 3,
//       Name: "الإيرادات",
//       ParentId: 0,
//       Children: [
//           {
//               Id: 22,
//               Name: "إيرادات النشاط التجاري",
//               ParentId: 3,
//               Children: [
//                   {
//                       Id: 24,
//                       Name: "إيرادات المبيعات",
//                       ParentId: 22,
//                       Children: []
//                   }
//               ]
//           }
//       ]
//   },
//   {
//       Id: 4,
//       Name: "المصروفات",
//       ParentId: 0,
//       Children: [
//           {
//               Id: 23,
//               Name: "مصروفات النشاط التجاري",
//               ParentId: 4,
//               Children: []
//           }
//       ]
//   }
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  Name: string;
  level: number;
}
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  AccountsTree:Account[];
AccountsType=[{id:0,type:"Others"},{id:1,type:"Bank"},{id:2,type:"Box"},{id:3,type:"Customer"},{id:4,type:"Supplier"}]
  modalRef?: any;
  newAccount:Account=new Account();
  parents:Account[]=new Array<Account>();
  apperIn=[{id:0,appear:"Income"},{id:1,appear:"Financial"}]
  accountType:AccountType = AccountType.Sub;

toggle(event:any){

 event.target.parentElement.querySelector(".nested").classList.toggle("active");
 event.target.classList.toggle("caret-down")

}
  constructor(private service:ApiService, config:NgbModalConfig,private modalService:BsModalService) {
    config.backdrop='static';
    config.keyboard=false;

  }
  isSub():boolean{
    return true;
  }
save(){
  debugger

if (this.accountType == AccountType.Sub) {
  this.newAccount.isSub = true;
} else {
  this.newAccount.isSub = false;
}
this.service.addAccount(this.newAccount).subscribe(data=>{

  console.log(data);
  this.modalRef.hide();
  this.getAllAccounts();

},error=>{
  console.log(error);

})



}

	showModal(modal: any){


    this.getParents(this.AccountsTree);
    this.modalRef= modal
    this.modalRef.show();
  }

  getParents(Accounts:Account[]){



Accounts.forEach(a=>{
console.log(a.name+":"+a.isSub);
console.log(a);

  if(!a.isSub){
    this.parents.push(a);
  }

a.children&&a.children.length>0?this.getParents(a.children):null;


})


  }



  ngOnInit(): void {
 this.getAllAccounts();

  }


getAllAccounts(){
  this.service.getAllAccounts().subscribe(data=>{


    this.AccountsTree=data;
    console.log(this.AccountsTree);


   })


}
canCreat():Boolean{
  return UserConstant.hasPermission("Permission.Accounts.Create")
 }




}
export enum AccountType {
  Sub = 1,
  Main = 2,
}
