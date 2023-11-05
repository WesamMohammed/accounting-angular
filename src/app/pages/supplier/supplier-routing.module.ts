import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';



const routes: Routes = [
  {path:"",component:SupplierListComponent},
  
]
@NgModule({
  
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
