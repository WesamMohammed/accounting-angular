import { from, fromEvent, interval, Observable,of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
//import { Observable } from 'rxjs';
@Component({
    selector: 'app-root',
    template: `

    <router-outlet></router-outlet>`,
    providers:[]
})
export class RootComponent implements AfterViewInit
  {



    constructor(private http:HttpClient){
console.log("rootcomponent");


    }
    OnInit(){



    }
    ngAfterViewInit(): void {
        let count=0;
       //  this.click$=fromEvent(this.butn.nativeElement,"click" );
       // this.mergm();




    }
delayedObs(count:number){


        // setTimeout(()=>{
        //     return this.http.get<any>(url);
        // },2000)
        // setTimeout(()=>{
        //     return this.http.get<any>(url);
        // },4000)
        // setTimeout(()=>{
        //     return this.http.get<any>(url);
        // },6000)
        // setTimeout(()=>{
        //     return this.http.get<any>(url);
        // },8000)
        // setTimeout(()=>{
        //     return this.http.get<any>(url);
        // },10000)
    ;
    // return new Observable((observer)=>{
    //     setTimeout(()=>{observer.next(count+"A")},2000)
    //     setTimeout(()=>{observer.next(count+"B")},4000)
    //     setTimeout(()=>{observer.next(count+"C")},6000)
    //     setTimeout(()=>{observer.next(count+"D")},8000)
    //     setTimeout(()=>{observer.next(count+"E");
    // observer.complete()},10000)
    // })
}

}
