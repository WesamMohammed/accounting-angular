import { Customer } from './../Models/Customer';
import { SalesInvoice } from './../Models/SalesInvoice';
import { ManageUserRolesViewModel } from './../Models/user';
import { ManageRolePermissionsViewModel } from './../Models/Role';

import { Product } from './../Models/Product';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { InvoiceMaster, PurchasesInvoice } from '../Models/InvoiceMaster';
import { Observable, throwError as _observableThrow, of as _observableOf, throwError } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch, catchError } from 'rxjs/operators';
import { Account } from '../Models/Accounts';
import {  Inject, Optional, InjectionToken } from '@angular/core';

const BaseUrl:string="https://localhost:3000/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }

  addSales(salesInvoice:InvoiceMaster):Observable<InvoiceMaster>{

    return this.http.post<InvoiceMaster>(BaseUrl+"/SalesInvoice/addSales",salesInvoice);

    }
    addReturnSales(salesInvoice:InvoiceMaster):Observable<InvoiceMaster>{

      return this.http.post<InvoiceMaster>(BaseUrl+"/SalesInvoice/AddReturnSales",salesInvoice);

      }
    updateSales(salesInvoice:InvoiceMaster):Observable<InvoiceMaster>{
      return this.http.post<InvoiceMaster>(BaseUrl+"/SalesInvoice/UpdateSalesInvoice",salesInvoice);
    }
    updatePurchases(salesInvoice:InvoiceMaster):Observable<InvoiceMaster>{
      return this.http.post<InvoiceMaster>(BaseUrl+"/Purchases/UpdateSalesInvoice",salesInvoice);
    }

    updateReturnSales(salesInvoice:InvoiceMaster):Observable<InvoiceMaster>{
      return this.http.post<InvoiceMaster>(BaseUrl+"/SalesInvoice/UpdateReturnSales",salesInvoice);
    }

    getAllSales(sale?:InvoiceMaster,page?:number,pageSize?:number,sort?:string,isAscending?:boolean):Observable<any>{
      if(!sale){
        sale=new InvoiceMaster();
      }
      if(!page||!pageSize||!sort||isAscending==null){
        return this.http.post<any>(BaseUrl+"/SalesInvoice/GetAllSalesInvoice",sale);
      }

      return this.http.post<any>(`${BaseUrl}/SalesInvoice/GetAllSalesPagination?page=${page}&pageSize=${pageSize}&sort=${sort}&isAscending=${isAscending}`,sale);
    }
    getAllPurchases(sale?:InvoiceMaster):Observable<any>{
      if(!sale){
        sale=new InvoiceMaster();
      }
      return this.http.post<any>(BaseUrl+"/Purchases/GetAllPurchasesInvoice",sale);
    }
    getAllReturnSales(ReturnSale?:InvoiceMaster,page?:number,pageSize?:number,sort?:string,isAscending?:boolean):Observable<any>{
      if(!ReturnSale){
        ReturnSale=new InvoiceMaster();
      }
     if(!page||!pageSize||!sort||isAscending==null){
      return this.http.post<any>(BaseUrl+"/SalesInvoice/GetAllReturnSales",ReturnSale);
     }
     return this.http.post<any>(`${BaseUrl}/SalesInvoice/GetAllReturnSalesPagenation?page=${page}&pageSize=${pageSize}&sort=${sort}&isAscending=${isAscending}`,ReturnSale);
    }
    getSalesById(id:number):Observable<InvoiceMaster>{
      return this.http.get<InvoiceMaster>(BaseUrl+"/SalesInvoice/GetSalesInvoiceByid?id="+id);
    }
    getPurchasesById(id:number):Observable<InvoiceMaster>{
      return this.http.get<InvoiceMaster>(BaseUrl+"/Purchases/GetSalesInvoiceByid?id="+id);
    }
    getReturnSalesById(id:number):Observable<InvoiceMaster>{
      return this.http.get<InvoiceMaster>(BaseUrl+"/SalesInvoice/getReturnSalesById?id="+id);
    }

    getAllAccounts():Observable<Account[]>{
      return this.http.get<Account[]>(BaseUrl+"/Account/GetAllAccounts");
    }
    getSubAccounts(invoiceType?:any):Observable<Account[]>{
      if(invoiceType===undefined){
        return this.http.get<Account[]>(BaseUrl+"/Account/GetSubAccounts");
      }
      return this.http.get<any>(BaseUrl+"/Account/GetSubAccounts?invoiceType="+invoiceType);
    }
    addAccount(account: Account):Observable<any>{
      return this.http.post<any>(BaseUrl+"/Account/AddAcount",account);
    }

getAllProducts():Observable<any>{
  return this.http.get<any>(BaseUrl+"/Product/GetAllProducts");
}
getProductById(id:number):Observable<any>{
  return this.http.get<any>(BaseUrl+"/Product/GetProductById?Id="+id);
}
// addProduct(product:Product):Observable<any>{
//   return this.http.post<any>(BaseUrl+"/Product/AddProduct",product);
// }
addProduct(product:Product):Observable<any>{
  return this.http.post<any>(BaseUrl+"/Product/AddProduct",product);
}
updateProduct(product:Product):Observable<any>{

   return this.http.post<any>(BaseUrl+"/Product/UpdateProduct",product);

}
addCustomer(customer: Customer):Observable<any> {
 return this.http.post<any>(BaseUrl+"/Customer/AddCustomer",customer);
}
updateCustomer(customer: Customer):Observable<any> {
  return this.http.post<any>(BaseUrl+"/Customer/UpdateCustomer",customer);
 }
getAllCustomers(customer?:Customer):Observable<any>{
  if(!customer){
    customer=new Customer();
  }

  return this.http.post<any>(BaseUrl+"/Customer/GetAllCustomers",customer);
  }
  GetMainAccountsCustomerType():Observable<any>{
    return this.http.get<any>(BaseUrl+"/Customer/GetMainAccountsCustomerType");
  }
  getAllSupplires():Observable<any>{

    return this.http.get<any>(BaseUrl+"/Customer/GetAllSupplires");
    }
getAllStores():Observable<any>{

  return this.http.get(BaseUrl+"/Store/GetAllStores");
}

addPurchases(purchases:InvoiceMaster):Observable<PurchasesInvoice>{

  return this.http.post<PurchasesInvoice>(BaseUrl+"/Purchases/AddPurchases",purchases);

  }
  authenticate(body: AuthenticateModel | undefined): Observable<any> {

    return this.http.post<any>(BaseUrl+"/Auth/Login",body);


}

getUserInfo():Observable<any>{
  return this.http.get<any>(BaseUrl+"/Users/GetUserInf");

}

getAllRoles():Observable<any>{
  return this.http.get<any>(BaseUrl+"/Roles/GetAllRoles");
}
getRolePermissions(roleId?:string):Observable<any>{

  return this.http.get<any>(BaseUrl+"/Roles/GetRolePermissions?roleId="+roleId);
}
addRole(roleModel:ManageRolePermissionsViewModel):Observable<any>{
  return this.http.post<any>(BaseUrl+"/Roles/AddRole",roleModel);
}
updateRolePermissions(roleModel:ManageRolePermissionsViewModel):Observable<any>{
  return this.http.post<any>(BaseUrl+"/Roles/UpdateRolePermissions",roleModel)
}
getAllUsers():Observable<any>{
  return this.http.get(BaseUrl+"/Users/GetAllUsers");
}
getUserRoles(userId?:string):Observable<any>{

  return this.http.get<any>(BaseUrl+"/Users/GetUserRoles?userId="+userId);
}
updateUserRoles(userModel:ManageUserRolesViewModel):Observable<any>{
  return this.http.post<any>(BaseUrl+"/Users/UpdateUserRoles",userModel)
}
}
export class AuthenticateModel {
  Email: string;
  password: string;
}
export interface IAuthenticateModel {
 Email: string;
  password: string;
 // rememberClient: boolean;
}
export class AuthenticateResultModel  {
   message :string
   isAuthenticated:boolean
  userName:string
   email:string
  roles:string[]
  token :string|undefined
  expiration :number


}


export interface IAuthenticateResultModel {
  Message :string
   IsAuthenticated:boolean
  UserName:string
   Email:string
  Roles:string[]
  Token :string|undefined
   Expiration :number
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
      if (!blob) {
          observer.next("");
          observer.complete();
      } else {
          let reader = new FileReader();
          reader.onload = event => {
              observer.next((<any>event.target).result);
              observer.complete();
          };
          reader.readAsText(blob);
      }
  });
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
  if (result !== null && result !== undefined)
      return _observableThrow(result);
  else
      return _observableThrow(new ApiException(message, status, response, headers, null));
}
export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any; };
  result: any;

  constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
      super();

      this.message = message;
      this.status = status;
      this.response = response;
      this.headers = headers;
      this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
      return obj.isApiException === true;
  }
}

