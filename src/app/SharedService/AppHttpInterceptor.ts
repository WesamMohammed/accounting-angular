import { Router } from '@angular/router';
import { map, catchError, retryWhen, concatMap, finalize } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { observable, Observable, of, throwError } from 'rxjs';
import { SpinnerService } from '../shared/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {
   httpOptions={
    headers:new HttpHeaders({
      Authorizatin:'Bearer'+localStorage.getItem('token')
    })
   }
   constructor(private router:Router,private SpinnerService:SpinnerService){}
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    const token=localStorage.getItem('token');
if(token){
  req =req.clone({headers:req.headers.set('Authorization','Bearer '+token)})


}
this.SpinnerService.showSpinner();
    // return next.handle(req).pipe(catchError((err:Observable<HttpEvent<any>>)=>{




    //   if(err instanceof HttpErrorResponse){
    //     if(err.status===401){
    //       console.log("interceptor Rout");

    //       this.router.navigate(['/auth/login']);
    //     }
    //     return err;

    //   }
    // }))
    return next.handle(req).pipe(catchError((err:HttpErrorResponse)=>{


      


        if(err.status===401){
          console.log("interceptor Rout");

          this.router.navigate(['/auth/login']);
        }
        return throwError(err);


    }),finalize(()=>{
      this.SpinnerService.hideSpinner();
    }))

  }
}

