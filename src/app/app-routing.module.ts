import { CustomerComponent } from './Customer/Customer.component';
import { ReturnSalesComponent } from './ReturnSales/ReturnSales.component';
import { ProductComponent } from './product/product.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { HomeComponent } from './home/home.component';
import { AppRouteGuard } from './SharedService/AppRouteGuard';
import { AppComponent } from './app.component';
import { PurchasesInvoiceComponent } from './purchases-invoice/purchases-invoice.component';
import { AccountsComponent } from './accounts/accounts.component';

import { SalesInvoiceComponent } from './salesInvoice/sales-invoice/sales-invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesViewComponent } from './salesInvoice/salesView/salesView.component';
//import { DisabledFormDirective } from './disabledForm.directive';

const routes: Routes = [
{path:'',component:AppComponent,children:[
  {path:'sales',component:SalesInvoiceComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Sales.View'}},
  {path:'returnsales',component:ReturnSalesComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Sales.View'}},
  {path:'purchases',component:PurchasesInvoiceComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Purchases.View'}},
  {path:'products',component:ProductComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Products.View'}},
  {path:'accounts',component:AccountsComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Accounts.View'}},
  {path:'customers',component:CustomerComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Customers.View'}},
  {path:'roles',component:RolesComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Roles.View'}},
  {path:'users',component:UsersComponent,canActivate:[AppRouteGuard],data:{permission:'Permission.Users.View'}},
  {path:'home',component:HomeComponent,canActivate:[AppRouteGuard]},
 // {path:'saleview/:id',component:SalesViewComponent}



]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
