import { Component, OnInit } from '@angular/core';
import { OperationType } from '../Enums/enums';

@Component({
  selector: 'app-ReturnSales',
  templateUrl: './ReturnSales.component.html',
  styleUrls: ['./ReturnSales.component.css']
})
export class ReturnSalesComponent implements OnInit {
operationType=OperationType.ReturnSales
  constructor() { }

  ngOnInit() {
  }

}
