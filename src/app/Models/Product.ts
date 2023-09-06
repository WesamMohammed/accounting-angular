
import { unit } from "./unit";

export interface IProduct{
  id:number;
  name:string;

  categoryId: number|null,
  isDeleted: boolean,
  sellingPrice: number|null,
  purchasingPrice: number|null,
  barcode: number|null,
  description: string|null,
  productUnits:unit[];
}

export class Product implements IProduct{
  id:number;
  name:string;

  categoryId: number|null;
  isDeleted: boolean;
  sellingPrice: number|null;
  purchasingPrice: number|null;
  barcode: number|null;
  description: string|null;
  productUnits:unit[];
}

