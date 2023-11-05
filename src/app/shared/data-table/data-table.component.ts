import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/core/Models/action';
import { Column } from 'src/app/core/Models/column';
import { Row } from 'src/app/core/Models/row';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() columns:Column[];
  @Input() rows:any[];
  @Input() actions:Action[];
  @Output() edite=new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
editeClicked(data:any){
  console.log("data",data);
  
  this.edite.emit(data);
}
}
