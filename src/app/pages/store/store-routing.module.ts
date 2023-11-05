import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StoreListComponent } from './store-list/store-list.component';

const routes: Routes = [
  {path:"",redirectTo:"list",pathMatch:"full"},
  {path:"list",component:StoreListComponent}
]
@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
