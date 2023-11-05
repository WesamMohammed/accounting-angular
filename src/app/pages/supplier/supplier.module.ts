import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
  ],
  declarations: [SupplierComponent,SupplierListComponent,CreateSupplierComponent]
})
export class SupplierModule { }
