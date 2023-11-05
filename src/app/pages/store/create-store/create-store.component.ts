import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/SharedService/api.service';
import { Store } from 'src/app/core/Models/store.model';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {
  id!:number;
  form!: FormGroup;
  store!:Store;
  isSubmitted=false;
  title!:string;
  get _form(): any {
    return this.form.controls;
  }
  constructor(private fb: FormBuilder,private modalService: BsModalService,private apiService:ApiService) { 
    this.initForm();
  }

  ngOnInit() {
this.getModalConfig()
if(this.id){
  this.getStore()
}

  }
  getModalConfig() {
    const data=    this.modalService.config.initialState["data"] as any;
    this.id=data?.id as number;
    this.title=data?.title;
  }
  getStore() {
    console.log("getStore",this.id);
    
    this.apiService.getAllStores().subscribe({
      next:(res:any[])=>{
        this.store=res.find(a=>a.id===this.id);
        this.updateFormValue();
      }
    })
    
  }

  initForm(){
    this.form = this.fb.group({
      id: [null], // don't make input in html for this field
      name: [null, [Validators.required]],
     
     
    });
  }
  updateFormValue(){
    const formData = {
      ...this.store
    };
    console.log("update:",formData);
    
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
    const dataForm={name:this.form.get("name").value}
    console.log(dataForm);
    
    this.apiService.AddStore(dataForm).subscribe(
      {next:(res)=>{
        this.close();
      },error:(error)=>{
        console.log(error);
        
      }}
      )
  }
  updateItem() {
    throw new Error('Method not implemented.');
  }
  close(){
    this.modalService.hide();
  }
}
