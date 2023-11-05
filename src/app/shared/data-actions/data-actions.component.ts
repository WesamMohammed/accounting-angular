import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Action } from 'src/app/core/Models/action';

@Component({
  selector: 'data-actions',
  templateUrl: './data-actions.component.html',
  styleUrls: ['./data-actions.component.css']
})
export class DataActionsComponent implements OnInit {
  @Input() data:any;
  @Input() actions:Action[];
  


  ngOnInit() {
  }
// clicked(event?:any){
// console.log(event);

// this.actions.emit(this.data);
// }
}
