import { UserConstant } from './Constants/UserConstant';
import { AppHttpInterceptor } from './app/SharedService/AppHttpInterceptor';
import { AppRouteGuard } from './app/SharedService/AppRouteGuard';
import { AuthService } from './app/SharedService/Auth.service';
import { ApiService } from './app/SharedService/api.service';
import { AuthModule } from './auth/auth.module';
import { AppModule } from './app/app.module';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';




import { RootRoutingModule } from './root-routing.module';
import { resolve } from 'path';
import { RootComponent } from './root.component';
import { CommonModule, DatePipe } from '@angular/common';


// }
export function intializeApp(service:ApiService){

  return ():Promise<any>=>{
    return new Promise((resolve,reject)=>{

      service.getUserInfo().toPromise().then(result=>{
        UserConstant.email=result.email;
        UserConstant.roles=result.roles;
        UserConstant.userName=result.userName;
        UserConstant.id=result.id;
        UserConstant.permissions=result.permissions;
        console.log("logged in");

        resolve(result)


      },err=>{
        console.log('noooooooo');

        resolve(err)
      })
    })
  }
}

@NgModule({
  imports: [
   BrowserModule,
   CommonModule,
  
    HttpClientModule,
  
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
  
    RootRoutingModule,
    AppModule,
    AuthModule,

  ],
  declarations: [RootComponent],
  // providers: [DatePipe,ApiService],
  providers: [DatePipe,ApiService,
    AuthService,
    AppRouteGuard,
    {provide:HTTP_INTERCEPTORS,useClass:AppHttpInterceptor,multi:true},
   {provide:APP_INITIALIZER,useFactory:intializeApp,deps:[ApiService],multi:true}
   
  ],
  bootstrap: [RootComponent],
})
export class RootModule {
  constructor(){
    console.log("RootModule");

  }
}
