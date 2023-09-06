export interface Iunit{
  unitId: number,
  unitName: string
  unitSellingPrice: number|null,
  unitPurchasingPrice: number|null,
  unitBarCode: number|null,
  ratio: number|null

}
export class unit implements Iunit{
  unitId: number;
  unitName: string;
  unitSellingPrice: number;
  unitPurchasingPrice: number|null;
  unitBarCode: number|null;
  ratio: number|null;
  index:number;

}
