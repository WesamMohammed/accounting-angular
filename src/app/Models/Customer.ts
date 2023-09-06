import { Account } from './Accounts';
export class Customer{


  id:number;
  name:string;
  email:string;
  phone:string;
  country:string;
  city:string;
  account:AccountCustomer;
  constructor(account?:AccountCustomer){
this.account=account;
  }

}

export class AccountCustomer{
  parentId:number;
}
