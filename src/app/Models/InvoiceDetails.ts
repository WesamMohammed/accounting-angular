import { unit } from "./unit";

export interface IInvoiceDetails{


       productId : number;
       productUnitId : number
       unitPrice ?: number;
       quantity? : number;
       totalPrice ?: number;
       isEntering ?: boolean;
       units:unit[];


}
export class InvoiceDetails implements IInvoiceDetails {


  productId : number;
  productUnitId : number
  unitPrice : number=0;
  quantity : number=1;
  totalPrice : number=0;

  units:unit[];
  constructor(data?: IInvoiceDetails) {
    if (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property))
                (<any>this)[property] = (<any>data)[property];
        }
    }
}

}

