import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/SharedService/api.service';
import { Action } from 'src/app/core/Models/action';
import { Column } from 'src/app/core/Models/column';
import { CreateStoreComponent } from '../create-store/create-store.component';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {
columns:Column[]=[{
  name:"id",
  
},{
  name:"name",
  
}]

actions:Action[]=[{
  icon:"fas fa-pencil-alt",
  name:"edit",
  command:(a)=>{
    console.log("id:",a?.id);
    
      this.addStore(a?.id);
      
  },
  
},{
  icon:"fas fa-print",
  name:"",

  command:(a)=>{
      console.log(a);
      
  },
  
},{
  icon:"fas fa-trash",
  name:"",

  command:(a)=>{
      console.log(a);
      
  },
  
}];
bsModalRef?: BsModalRef;
stores!:any[];
  constructor(private ApiService:ApiService,private modalService: BsModalService) { }

  ngOnInit() {
    this.getAllstores();
  }
getAllstores(){
  this.ApiService.getAllStores().subscribe({
    next:(res)=>{
      this.stores=res;
    }
  })
}
addStore(id?:number){
  const initialState: ModalOptions = {
    initialState: {
      
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      
      data:{
        id:id,
        title:"Add Store"
      }
    }
  };
  
  this.bsModalRef = this.modalService.show(CreateStoreComponent, initialState);
  this.bsModalRef.content.closeBtnName = 'Close';
  this.bsModalRef.onHide.subscribe(
    ()=>{
     this.getAllstores() ;
    }
  )
}


 
 
  openModalWithComponent() {
  
  }
}
