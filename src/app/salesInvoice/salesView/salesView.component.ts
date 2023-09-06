import { OperationType } from 'src/app/Enums/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../SharedService/api.service';
import { Component, OnInit, AfterViewInit, Input, ElementRef } from '@angular/core';
import { InvoiceMaster } from 'src/app/Models/InvoiceMaster';

@Component({
  selector: 'app-salesView',
  templateUrl: './salesView.component.html',
  styleUrls: ['./salesView.component.css']
})
export class SalesViewComponent implements OnInit,AfterViewInit {
id:any;
  constructor(private service:ApiService,private activatedRout:ActivatedRoute,private router:Router) {


  }
  @Input() salesInvoice: any;
  @Input() operationType:OperationType;


  ngAfterViewInit(): void {



  }
 // salesInvoice:any;
  sale:InvoiceMaster=new InvoiceMaster();
  ngOnInit() {

//     this.activatedRout.paramMap.subscribe(params=>{
//       console.log(params);

// this.id=params.get('id');
// this.sale.id=this.id;
//     });


//     if(this.id){
//       this.startViewSale();
//     }


  }

  startViewSale(){


     this.service.getAllSales(this.sale).subscribe(result=>{

       this.salesInvoice=result[0];


console.log(this.salesInvoice);



     })
    }

}
