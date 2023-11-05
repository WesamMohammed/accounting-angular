import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/SharedService/api.service';
import { Action } from 'src/app/core/Models/action';
import { CreateStoreComponent } from '../../store/create-store/create-store.component';
import { CreateSupplierComponent } from '../create-supplier/create-supplier.component';
import { Column } from 'src/app/core/Models/column';


@Component({
  selector: 'supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  bsModalRef!:BsModalRef;
columns:Column[]  =[{name:"name"},{name:"email"},{name:"phone"},{name:"country"}];
rows!:any[];
  actions:Action[]=[{
    icon:"fas fa-pencil-alt",
    name:"edit",
    command:(a)=>{
      console.log(a);
      
      console.log("id:",a?.id);
      
        this.addSupplier(a?.id);
        
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
  constructor(private apiService:ApiService,private modalService:BsModalService) { }
  

  ngOnInit() {
    this.getAllSuppliers();
  }

  getAllSuppliers(){
    this.apiService.getAllSupplires().subscribe({next:(res)=>{
    this.rows=res;

    }})
  }
  addSupplier(id?:number){
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
    
    this.bsModalRef = this.modalService.show(CreateSupplierComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHide.subscribe(
      ()=>{
       this.getAllSuppliers() ;
      }
    )
  }
}
