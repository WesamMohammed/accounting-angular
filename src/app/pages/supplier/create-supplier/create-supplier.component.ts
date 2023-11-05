import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/SharedService/api.service';
import { Store } from 'src/app/core/Models/store.model';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit {

  id!:number;
  form!: FormGroup;
  sup!:any;
  isSubmitted=false;
  title!:string;
  get _form(): any {
    return this.form.controls;
  }
  MainAccountsCustomerType:any;
  constructor(private fb: FormBuilder,private modalService: BsModalService,private apiService:ApiService) { 
    this.initForm();
  }

  ngOnInit() {
this.getModalConfig()
this.getMainAccounts()
if(this.id){
  this.getSupplier()
}

  }
  getMainAccounts() {
    this.apiService.Get("Customer","GetMainAccountsSuppliers").subscribe({next:(res)=>{
      this.MainAccountsCustomerType=res;
    }})
  }
  getModalConfig() {
    const data=    this.modalService.config.initialState["data"] as any;
    this.id=data?.id as number;
    this.title=data?.title;
  }
  getSupplier() {
    console.log("getStore",this.id);
    
    this.apiService.GetById("Customer","GetSupplierById",this.id).subscribe({
      next:(res)=>{
        this.sup=res;
        this.updateFormValue();
      }
    })
    
  }

  initForm(){
    this.form = this.fb.group({
      id: [null], // don't make input in html for this field
      name: [null, [Validators.required]],
      email:[null,[Validators.required]],
      country:[null,[Validators.required]],
      city:[null],
      phone:[null,[Validators.required]],
      account:this.fb.group({
        parentId:[null,[Validators.required]]
      })
     
     
    });
  }
  updateFormValue(){
    const formData = {
      ...this.sup
    };
    console.log("update:",formData);
    this.form.get("account").disable();
    this.form.patchValue(formData);
    this.form.updateValueAndValidity();
  }
  submit(){
      if(this.id){
        this.updateItem();
      }
      else{
        this.addItem()
      }
  }
  addItem() {
    const dataForm={...this.form.value}
    console.log(dataForm);
    
    this.apiService.addCustomer(dataForm).subscribe(
      {next:(res)=>{
        this.close();
      },error:(error)=>{
        console.log(error);
        
      }}
      )
  }
  updateItem() {
    const dataForm={...this.form.value}
    this.apiService.updateCustomer(dataForm).subscribe({next:(res)=>{
      this.close()
    },error:(err)=>{
      console.log(err);
      
    }})
  }
  close(){
    this.modalService.hide();
  }
 get getTitle(){

  return this.id?"Update Supplier":"Add Supplier";

  }

}
