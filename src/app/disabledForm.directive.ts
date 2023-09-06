import { Directive, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[disabledForm]'
})
export class DisabledFormDirective implements OnInit {
@Input('disabledForm') disabled:boolean;
  constructor(private ngForm:NgForm) { }

  ngOnInit(): void {
    console.log(this.ngForm.form);
    console.log("foooooooooooooooooorm:"+this.disabled);



   if(this.disabled){
    debugger
    console.log("foooooooooooooooooorm:trueuuuuuuuu"+this.disabled);
    this.ngForm.form[''].disable();
   }
   else{
    console.log("foooooooooooooooooorm:falseeeeeeee"+this.disabled);
    this.ngForm.form.enable();
   }
   console.log(this.ngForm.form);
  }

}
