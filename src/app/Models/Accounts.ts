export interface IAccount{
  id: number;
  name: string;
  accountNumber:number;
  isSub:boolean;
  parentId: number;
  appearIn:number;
  accountType:number;
  children?: IAccount[] ;
}
export class Account implements IAccount{
  id: number;
  name: string;
  accountNumber:number;
  isSub:boolean;
  parentId: number;
  appearIn:number;
  accountType:number;
  children?: IAccount[] ;
}
