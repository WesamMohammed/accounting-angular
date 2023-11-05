import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() title;
  @Input() actionName="New";
  @Output() action=new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  actionClicked(){
    this.action.emit();
  }
}
