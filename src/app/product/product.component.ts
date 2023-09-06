import { unit } from './../Models/unit';
import { UserConstant } from './../../Constants/UserConstant';
import { ApiService } from './../SharedService/api.service';
import { Product } from './../Models/Product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  editing:boolean=false;
  modalRef:any;
  submitting:boolean=false;
  products:Product[];
  newProduct:Product=new Product();
  constructor(private service:ApiService) { }

  ngOnInit() {
    if(this.canViewProducts()){
      this.getAllProducts();
    }
  }
  getAllProducts(){
    this.service.getAllProducts().subscribe(result=>{
      this.products=result;
    },err=>{
      console.log("eerore");

    })
  }
  addNewProduct(){
    this.newProduct=new Product();
    this.addNewUnit();
  }
  addNewUnit(){
   if(this.newProduct){

    var u=new unit();
    if(!this.newProduct.productUnits){
      this.newProduct.productUnits=new Array<unit>();
      u.unitName="one"
      u.ratio=1;

    }
    u.unitPurchasingPrice=0;
    u.unitSellingPrice=0;
    u.index=this.newProduct.productUnits?this.newProduct.productUnits.length+1:1;
    this.newProduct.productUnits.push(u);







   }
  }
  removeUnit(index:number){
    this.newProduct.productUnits.splice(index,1);
    }

  save(){
    this.submitting=true

if(this.editing){
this.service.updateProduct(this.newProduct)
.subscribe(result=>{
  this.getAllProducts();

      this.modalRef.hide();
      this.submitting=false;
      this.editing=false;

},err=>{
  this.submitting=false;
  console.log(err.error.errorMessage);

})

}
else{
this.addProduct();
}

  }
  addProduct(){

    this.service.addProduct(this.newProduct).subscribe(result=>{


      this.getAllProducts();

      this.modalRef.hide();
      this.submitting=false;


    })
  }
  canViewProducts():boolean{
return UserConstant.hasPermission("Permission.Products.View");
  }
  canEditProducts(){}

  showModal(modal: any,product?:Product){
    this.editing=false
    //this.getRolePermissions(role?.roleId);
    if(product){
      this.editing=true;
     this.getProduct(product)
     // this.newProduct=product;
    }
    else{
      this.addNewProduct()
    }
    //this.getParents(this.AccountsTree);
    this.modalRef= modal
    this.modalRef.show();
  }
  delete(Product:Product){}
  getProduct(product:Product){
    this.service.getProductById(product.id).subscribe(result=>{
      console.log(result);
      this.newProduct=result;

    },err=>{
      console.log(err);

    })
  }
}
