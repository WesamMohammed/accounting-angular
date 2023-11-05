import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateStoreComponent } from './create-store/create-store.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forChild(),
  ],
  declarations: [StoreListComponent,CreateStoreComponent]
})
export class StoreModule { }
