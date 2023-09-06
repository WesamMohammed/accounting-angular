import { InvoiceDetails } from "./InvoiceDetails";

export interface IInvoiceMaster{



   id : number|undefined;
   storeId:number;
   description :  string |undefined;
   invoiceType : number|undefined;
   date : string|undefined;
    accountMadinId ?: number;
    accountDainId?:number;
   total ?: number;
   isDeleted : boolean|undefined;
   customerId :number|null;
   supplierId:number|null;
   invoiceDetails:InvoiceDetails[]|undefined ;
}

export class InvoiceMaster implements IInvoiceMaster{



  id : number;
  idForReturn:number;
  description :  string;
  storeId:number;
  invoiceType : number;
  date : string;
   accountMadinId : number;
   accountDainId:number;
  total : number;
  isDeleted : boolean=false;
  customerId :number;
  supplierId:number;
  invoiceDetails:InvoiceDetails[]=[] ;

    constructor(data?: IInvoiceMaster) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }


  }
}

export class PurchasesInvoice {



  id : number=0;
  description :  string ='';
  storeId:number;
  invoiceType : number;
  date : string;

   accountDainId:number;
  total : number=0;


  supplireId:number;
  invoiceDetails:InvoiceDetails[]=[] ;

    constructor(data?: PurchasesInvoice) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }


  }
}


