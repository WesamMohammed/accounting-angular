import { DisabledFormDirective } from './disabledForm.directive';
import { SalesViewComponent } from './salesInvoice/salesView/salesView.component';
import {ModalModule} from 'ngx-bootstrap/modal';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './SharedService/api.service';
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import {MatTreeModule} from '@angular/material/tree'
import {MatIconModule} from '@angular/material/icon'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalesInvoiceComponent } from './salesInvoice/sales-invoice/sales-invoice.component';
import { FormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import { AccountsComponent } from './accounts/accounts.component';
import { PurchasesInvoiceComponent } from './purchases-invoice/purchases-invoice.component'
import { DatePipe, CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './LayOut/sidebar/sidebar.component';
import { SidebarMenuComponent } from './LayOut/sidebar-menu/sidebar-menu.component';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { ProductComponent } from './product/product.component';
import { ReturnSalesComponent } from './ReturnSales/ReturnSales.component';
import { CustomerComponent } from './Customer/Customer.component';





@NgModule({
  declarations: [
    AppComponent,
    SalesInvoiceComponent,
SalesViewComponent,
    AccountsComponent,
     PurchasesInvoiceComponent,
     SidebarComponent,
     SidebarMenuComponent,
      HomeComponent,
      RolesComponent,
      UsersComponent,
      ProductComponent,
      ReturnSalesComponent,
      CustomerComponent,
      DisabledFormDirective,
   ],
  imports: [
   //BrowserModule,
   CommonModule,
    AppRoutingModule,
   // BrowserAnimationsModule,
    
    MatIconModule,
    FormsModule,
    HttpClientModule,
    //MatSelectModule,
    NgbModule,
    ModalModule.forChild(),


  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
