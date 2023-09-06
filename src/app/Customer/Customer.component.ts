
import { ApiService } from './../SharedService/api.service';
import { Component, OnInit } from '@angular/core';
import { AccountCustomer, Customer } from '../Models/Customer';
import { UserConstant } from 'src/Constants/UserConstant';

@Component({
  selector: 'app-Customer',
  templateUrl: './Customer.component.html',
  styleUrls: ['./Customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service:ApiService) { }
AllCustomers:any=[];
editing:boolean=false;
  modalRef:any;
  submitting:boolean=false;

  newCustomer:Customer=new Customer(new AccountCustomer());
  MainAccountsCustomerType:any=[];
  ngOnInit() {
    this.getAllCustomers();
  }
  getAllCustomers(){

    if(this.canViewCustomers()){
      this.service.getAllCustomers().subscribe(result=>{
        this.AllCustomers=result;
      },err=>{
        console.log("eerore");

      })
    }
  }

	showModal(modal: any,customer?:Customer){

    this.editing=false;

    this.GetMainAccountsCustomerType();
    if(customer){
      this.editing=true;
     this.getCustomer(customer)

    }
    else{
      this.addNewCustomer()
    }

    this.modalRef= modal
    this.modalRef.show();
  }
  addNewCustomer(){
    this.newCustomer=new Customer(new AccountCustomer());

  }
  getCustomer(customer:Customer){
    this.service.getAllCustomers(customer).subscribe(result=>{

      this.newCustomer=result[0];

    },err=>{
      console.log(err);

    })
  }

  GetMainAccountsCustomerType(){
    this.service.GetMainAccountsCustomerType().subscribe(result=>{

      this.MainAccountsCustomerType=result;
    })





  }

  save(){
    this.submitting=true

if(this.editing){
this.service.updateCustomer(this.newCustomer)
.subscribe(result=>{
  this.getAllCustomers();

      this.modalRef.hide();
      this.submitting=false;
      this.editing=false;

},err=>{
  this.submitting=false;
  console.log(err.error.errorMessage);

})

}
else{
this.addCustomer();
}

  }
  addCustomer(){
    console.log(this.newCustomer);


    this.service.addCustomer(this.newCustomer).subscribe(result=>{


      this.getAllCustomers();

      this.modalRef.hide();
      this.submitting=false;


    },err=>{
      this.submitting=false;
    console.log(err.error);

    })
  }
  canViewCustomers():boolean{
    return UserConstant.hasPermission("Permission.Customers.View");
      }
}
