import { PurchasesInvoice } from './../Models/InvoiceMaster';
import { Component, ComponentFactoryResolver, ElementRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { InvoiceDetails } from '../Models/InvoiceDetails';
import { InvoiceMaster } from '../Models/InvoiceMaster';
import { Product } from '../Models/Product';
import { ApiService } from '../SharedService/api.service';
import { DatePipe } from '@angular/common';
import { OperationType } from '../Enums/enums';
import { UserConstant } from 'src/Constants/UserConstant';
import { SalesViewComponent } from '../salesInvoice/salesView/salesView.component';

@Component({
  selector: 'app-purchases-invoice',
  templateUrl: './purchases-invoice.component.html',
  styleUrls: ['./purchases-invoice.component.css']
})
export class PurchasesInvoiceComponent implements OnInit {
  @ViewChild('printFrame') printFrame:ElementRef;
  PurchasesInvoice:InvoiceMaster=new InvoiceMaster();
  //salesInvoiceDetails=new InvoiceDetails();
  //details:InvoiceDetails[]=[];
  isNewSale:boolean=false;
isediting:boolean=false;
naked:number=0;
agel:number=1;
@Input() OperationType:OperationType=OperationType.Purchases;

  invoceTypes=[{id:0,typeName:"Naked"},{id:1,typeName:"Agel"}]
  products:Product[];
  accounts:any=[];
  stores:any=[];
  suppliers:any;
  AllSale:any=[];
submitting:boolean=false;
isPrint:boolean;

saleForPrint:any;


constructor(private service:ApiService,private datePipe:DatePipe,private injector:Injector,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
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
              this.PurchasesInvoice=new InvoiceMaster()
              this.PurchasesInvoice.date=this.get2dayDate();
              this.PurchasesInvoice.invoiceDetails.push(new InvoiceDetails());
            }
              this.service.getAllStores().subscribe(data=>{
                this.stores=data;
                this.service.getAllProducts().subscribe(data=>{

                  this.products=data;
                  if(this.isediting){
                    this.PurchasesInvoice.invoiceDetails.forEach(a=>{
                     this.setProductUnits(a,true);
                    })
                  }
                  if(this.OperationType==OperationType.ReturnPurchases){
                    this.getAllSalesForReturn();
                  }

                })
                this.service.getAllSupplires().subscribe(data=>{
                  this.suppliers=data;
                })
                this.setMadinAccount(true);


              },err=>{
                console.log("errrrrrrrrrrrrrrrr");

              })
             }
            startEditSale(sale:InvoiceMaster){

              if(this.OperationType==OperationType.Purchases){
               this.service.getPurchasesById(sale.id).subscribe(result=>{

                 this.PurchasesInvoice=result;
                 this.isediting=true;



                 this.startNewSale();
               })
              }
              else{
               this.service.getReturnSalesById(sale.id).subscribe(result=>{
                 this.PurchasesInvoice=result;
                 this.isediting=true;

                 this.startNewSale();

               })

              }

                }
            getAllSales(){
              this.suppliers=[];
              this.accounts=[]
              this.products=[];
              this.PurchasesInvoice=null;
              this.isNewSale=false;
              this.isediting=false;

             if(this.OperationType==OperationType.Purchases)
             {
              this.service.getAllPurchases().subscribe(result=>{
                this.AllSale=result;
                console.log(this.AllSale);


              })
             }
             else{
              this.service.getAllReturnSales().subscribe(result=>{
                this.AllSale=result;



              })

             }

             }
            getAllSalesForReturn(){
              this.service.getAllSales().subscribe(result=>{
                this.AllSale=result;
              })
            }

            setMadinAccount(intialize=false){
              if(!intialize){
                if(this.OperationType!==OperationType.Purchases){
                 this.PurchasesInvoice.accountMadinId=null;
                }
                 else{
                   this.PurchasesInvoice.accountDainId=null;
                 }
                }
              // this.accounts.splice(0);



              this.service.getSubAccounts(this.PurchasesInvoice.invoiceType).subscribe(data=>{



                this.accounts=data;

              })
            }

            save(){
              // console.log(this.salesInvoice);

               this.submitting=true;
             if(this.isediting){
                 if(this.OperationType==OperationType.Purchases){
                   this.service.updatePurchases(this.PurchasesInvoice).subscribe(result=>{


                      this.isediting=false;
                      this.submitting=false;
                      this.startNewSale();
                    },err=>{
                      this.submitting=false;

                    })
                 }
                 else{
                   this.service.updateReturnSales(this.PurchasesInvoice).subscribe(result=>{
                     this.isediting=false;
                     this.submitting=false;
                     this.startNewSale();
                   },err=>{
                     this.submitting=false;
                   })

                 }
             }
             else{
               this.PurchasesInvoice.date=this.get2dayDate();
               if(this.OperationType==OperationType.Purchases){
                 this.service.addPurchases(this.PurchasesInvoice).subscribe(
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
              this.service.addReturnSales(this.PurchasesInvoice).subscribe(
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
              this.PurchasesInvoice.invoiceDetails.push(new InvoiceDetails());
            }
            setProductUnits(detail:InvoiceDetails,intialize=false){
              let u=this.products.find(a=>a.id==detail.productId);
              if((detail.units===undefined || detail.units===null)&&!intialize){
                this.addDetails();
              }
               if(u?.productUnits!==undefined){
                detail.units=u?.productUnits;
               }

               detail.productUnitId=detail.units[0].unitId;
              // detail.unitPrice=detail.units[0].unitSellingPrice;
              this.setUnitPrice(detail);

              }
            removeDetails(index:number){
              this.PurchasesInvoice.invoiceDetails.splice(index,1);
              this.getTotal();

              }

            getTotalPrice(detail:InvoiceDetails){
              detail.totalPrice= detail.quantity*detail.unitPrice;
              this.getTotal();
            }
            setUnitPrice(detail:InvoiceDetails){
              let sprice=detail.units.find(a=>a.unitId==detail.productUnitId)?.unitPurchasingPrice;
              if(sprice!==undefined && sprice){
                detail.unitPrice=sprice;
              }
              this.getTotalPrice(detail);
            }

            setIdForReturn(){

              this.service.getSalesById(this.PurchasesInvoice.idForReturn).subscribe(result=>{
                this.PurchasesInvoice.supplierId=result.supplierId;
                this.PurchasesInvoice.accountMadinId=result.accountDainId;
                this.PurchasesInvoice.invoiceType=result.invoiceType;
                this.PurchasesInvoice.storeId=result.storeId;
                this.PurchasesInvoice.invoiceDetails=result.invoiceDetails;
                this.PurchasesInvoice.invoiceDetails.forEach(a=>{
                  this.setProductUnits(a,true);
                })

              })
            }
            getTotal(){

      this.PurchasesInvoice.total=0.0;
          this.PurchasesInvoice.invoiceDetails.forEach(product => {
        this.PurchasesInvoice.total+=product.totalPrice;
      });
            }
            canCreatSales():boolean{
              return UserConstant.hasPermission("Permission.Purchases.Create");
            }
   canViewSales():boolean{
              return UserConstant.hasPermission("Permission.Purchases.View");
         }
}
