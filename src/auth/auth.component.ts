import { AuthService } from './../app/SharedService/Auth.service';
import { AppComponentBase } from 'src/app/AppComponentBase';
import { from, fromEvent, interval, Observable,of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Pipe, Injector } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
//import { Observable } from 'rxjs';
@Component({
    selector: 'Auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.css'],
    providers:[]
})
export class AuthComponent extends AppComponentBase
  {
    submitting:boolean = false;


    constructor(injctor:Injector,public authService:AuthService){
      super(injctor);



    }
    login(){
      this.submitting=true;
      this.authService.authenticate(()=>{this.submitting=false})
    }



}
