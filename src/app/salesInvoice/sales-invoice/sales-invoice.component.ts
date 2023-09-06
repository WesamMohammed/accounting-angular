import { resolve } from 'path';
import { SalesInvoice } from './../../Models/SalesInvoice';
import { UserConstant } from './../../../Constants/UserConstant';
import { DatePipe } from '@angular/common';
import { ApiService } from './../../SharedService/api.service';
import { InvoiceMaster, IInvoiceMaster } from './../../Models/InvoiceMaster';


import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { InvoiceDetails } from 'src/app/Models/InvoiceDetails';
import { Product } from 'src/app/Models/Product';
import { OperationType } from 'src/app/Enums/enums';
import { SalesViewComponent } from '../salesView/salesView.component';


@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit,AfterViewInit {
  @ViewChild('printFrame') printFrame:ElementRef;
  doc:any;
salesInvoice:InvoiceMaster=new InvoiceMaster();
//salesInvoiceDetails=new InvoiceDetails();
//details:InvoiceDetails[]=[];
isNewSale:boolean=false;
isediting:boolean=false;
naked:number=0;
agel:number=1;
@Input() OperationType:OperationType=OperationType.Sales;

invoceTypes=[{id:0,typeName:"Naked"},{id:1,typeName:"Agel"}]
products:Product[];
accounts:any=[];
customers:any=[];
stores:any=[];

AllSale:any=[];
submitting:boolean=false;
isPrint:boolean;

saleForPrint:any;
page:number=1;
pageSize=10;
sort='Id';
isAscending=false;



  constructor(private service:ApiService,private datePipe:DatePipe,private injector:Injector,private componentFactoryResolver:ComponentFactoryResolver) {


   }
   ngOnInit(): void {


    // this.salesInvoice.date=this.get2dayDate();

    if(this.canViewSales()){
      this.getAllSales();
    }


      }
      ngAfterViewInit(): void {
        if(this.canViewSales()){
          this.getAllSales();
        }
      }
   generatePrintContent():string{
 // const printContent=document.createElement('div');
  const billComponent=this.componentFactoryResolver.resolveComponentFactory(SalesViewComponent)

    const componentRef=billComponent.create(this.injector);
    componentRef.instance.salesInvoice=this.saleForPrint;
    componentRef.instance.operationType=this.OperationType;

    componentRef.changeDetectorRef.detectChanges();
    //const billHtml=componentRef.location.nativeElement.innerHTML;
   // printContent.innerHTML=billHtml;
   //componentRef.destroy();
    const printFrame=this.printFrame.nativeElement;

  //  printFrame.contentWindow.document.body.innerHTML=printContent.innerHTML;
  const printContent=`<html>
  <head>
  Print
  </head>
  <body>
  ${componentRef.location.nativeElement.innerHTML}

  </body>
  </html>`;

   componentRef.destroy();
   componentRef.changeDetectorRef.detectChanges();
    return printContent


   }
   print(sale:any){
     this.saleForPrint=sale;
    // this.isPrint=true;
    const printContent= this.generatePrintContent();
  const printFrame=this.printFrame.nativeElement;
  const printDocument=printFrame.contentWindow.document;


  printDocument.open();
  printDocument.write(printContent);
  printDocument.close();

    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

   }



   get2dayDate(){
    var date=this.datePipe.transform(new Date(),"YYYY-MM-ddThh:mm:ss");
    return date?date:'';
   }

   startNewSale(){
    this.isNewSale=true;

  if(!this.isediting){
    this.salesInvoice=new InvoiceMaster()
    this.salesInvoice.date=this.get2dayDate();
    this.salesInvoice.invoiceDetails.push(new InvoiceDetails());
  }
    this.service.getAllStores().subscribe(data=>{
      this.stores=data;
      this.service.getAllProducts().subscribe(data=>{

        this.products=data;
        if(this.isediting){
          this.salesInvoice.invoiceDetails.forEach(a=>{
           this.setProductUnits(a,true);
          })
        }
        if(this.OperationType){
          this.getAllSalesForReturn();
        }

      })
      this.service.getAllCustomers().subscribe(data=>{
        this.customers=data;
      })
      this.setMadinAccount(true);


    },err=>{
      console.log("errrrrrrrrrrrrrrrr");

    })
   }
   startEditSale(sale:InvoiceMaster){

 if(!this.OperationType){
  this.service.getSalesById(sale.id).subscribe(result=>{

    this.salesInvoice=result;
    this.isediting=true;



    this.startNewSale();
  })
 }
 else{
  this.service.getReturnSalesById(sale.id).subscribe(result=>{
    this.salesInvoice=result;
    this.isediting=true;
    console.log(this.salesInvoice);
    this.startNewSale();

  })

 }

   }
   getAllSales(){
    this.customers=[];
    this.accounts=[]
    this.products=[];
    this.salesInvoice=null;
    this.isNewSale=false;
    this.isediting=false;

//this.isPagenation();
   if(!this.OperationType)
   {
    this.service.getAllSales(null,this.page,this.pageSize,this.sort,this.isAscending).subscribe(result=>{
      this.AllSale=result;
      console.log(this.AllSale);


    })
   }
   else{
    this.service.getAllReturnSales(null,this.page,this.pageSize,this.sort,this.isAscending).subscribe(result=>{
      this.AllSale=result;



    })

   }

   }
getAllSalesForReturn(){
 // this.isPagenation();
  this.service.getAllSales().subscribe(result=>{
    this.AllSale=result;
  })
}


  setMadinAccount(intialize=false){


   if(!intialize){
   if(!this.OperationType){
    this.salesInvoice.accountMadinId=null;
   }
    else{
      this.salesInvoice.accountDainId=null;
    }
   }

    this.service.getSubAccounts(this.salesInvoice.invoiceType).subscribe(data=>{
      console.log(data);


      this.accounts=data;

    })
  }
save(){
 // console.log(this.salesInvoice);

  this.submitting=true;
if(this.isediting){
    if(!this.OperationType){
      this.service.updateSales(this.salesInvoice).subscribe(result=>{


         this.isediting=false;
         this.submitting=false;
         this.startNewSale();
       },err=>{
         this.submitting=false;

       })
    }
    else{
      this.service.updateReturnSales(this.salesInvoice).subscribe(result=>{
        this.isediting=false;
        this.submitting=false;
        this.startNewSale();
      },err=>{
        this.submitting=false;
      })

    }
}
else{
  this.salesInvoice.date=this.get2dayDate();
  if(!this.OperationType){
    this.service.addSales(this.salesInvoice).subscribe(
      data=>{
        this.startNewSale();
        this.submitting=false;
        console.log("save");

      },
      error=>{
        console.log("error");
        this.submitting=false


      }
    )
  }
  else{
 this.service.addReturnSales(this.salesInvoice).subscribe(
      data=>{
        this.submitting=false;
        this.startNewSale();
 },
      error=>{
        console.log("error");
        this.submitting=false


      }
    )
  }
}
// console.log(this.salesInvoice);

}
addDetails(){
  // this.salesInvoiceDetails=new InvoiceDetails();
  // this.details.push(this.salesInvoiceDetails);
  this.salesInvoice.invoiceDetails.push(new InvoiceDetails());
}
setProductUnits(detail:InvoiceDetails,intialize=false){
let u=this.products.find(a=>a.id==detail.productId);
if((detail.units===undefined || detail.units===null)&&!intialize){
  this.addDetails();
}
 if(u?.productUnits!==undefined){
  detail.units=u?.productUnits;
 }
if(!intialize){
  detail.productUnitId=detail.units[0].unitId;
  this.setUnitPrice(detail);
}

// detail.unitPrice=detail.units[0].unitSellingPrice;


}
removeDetails(index:number){
this.salesInvoice.invoiceDetails.splice(index,1);
this.getTotal();
}
getTotalPrice(detail:InvoiceDetails){
  detail.totalPrice= detail.quantity*detail.unitPrice;
  this.getTotal();
}
setUnitPrice(detail:InvoiceDetails ){
  let sprice=detail.units.find(a=>a.unitId==detail.productUnitId)?.unitSellingPrice;
  if(sprice!==undefined && sprice){
    detail.unitPrice=sprice;
  }
  this.getTotalPrice(detail);
}
setIdForReturn(){

  this.service.getSalesById(this.salesInvoice.idForReturn).subscribe(result=>{
    this.salesInvoice.customerId=result.customerId;
    this.salesInvoice.accountDainId=result.accountMadinId;
    this.salesInvoice.invoiceType=result.invoiceType;
    this.salesInvoice.storeId=result.storeId;
    this.salesInvoice.invoiceDetails=result.invoiceDetails;
    this.salesInvoice.invoiceDetails.forEach(a=>{
      this.setProductUnits(a,true);
    })

  })
}
getTotal(){

  this.salesInvoice.total=0.0;
      this.salesInvoice.invoiceDetails.forEach(product => {
    this.salesInvoice.total+=product.totalPrice;
  });
}
canCreatSales():boolean{
  return UserConstant.hasPermission("Permission.Sales.Create");
}
canViewSales():boolean{
  return UserConstant.hasPermission("Permission.Sales.View");
}



//   createComponent() {


//     /*   var html_string= "content";
// document.getElementById('output_iframe1').src = "data:text/html;charset=utf-8," + escape(html_string); */

// //this.doc.getElementsByTagName('head')[0].innerHTML = '';

//   (async () => {
//     // Do something before delay
//    // await this.delay(1500);
//     this.doc.getElementsByTagName('body')[0].innerHTML = '';

//     let style = (document.createElement('link') as any);
//     style.type = 'text/css';
//     style.rel = 'stylesheet';
//     // style.href = 'assets/print-bond.css';
//     style.href='../../../assets/print-bond.css';

// //this.doc.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML;
// var g = document.createElement('div');
// g.innerHTML = document.getElementsByTagName("app-salesView")[0].innerHTML;
// this.doc.getElementsByTagName('head')[0].prepend(style);
// this.doc.body.appendChild(g);
//    // await this.delay(1500);
//     //if(this.isPrint && this.isDirctePrint)
//     if(this.isPrint)
//     {

//       window.frames["InvoicePreview"].focus();
//       window.frames["InvoicePreview"].print();
//     }

// })();


// }
changetable(){


  this.getAllSales();
}
// toggle(event:any){

//   event.target.parentElement.querySelector(".nested").classList.toggle("active");
//   event.target.classList.toggle("caret-down")

//  }

isPagenation(){
  if(this.isNewSale||this.isediting){
    this.page=null;
this.pageSize=null;
this.sort=null;
this.isAscending=null;
  }
  else{
    this.page=1;
this.pageSize=10;
this.sort="Id";
this.isAscending=true;

  }

}

}
