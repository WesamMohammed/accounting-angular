import { from, fromEvent, interval, Observable,of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
//import { Observable } from 'rxjs';
@Component({
    selector: 'root',
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
       ;




    }
delayedObs(count:number){


}

}
