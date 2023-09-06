import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { UserConstant } from 'src/Constants/UserConstant';
import { AuthenticateModel, AuthenticateResultModel, ApiService } from './api.service';

@Injectable()
export class AuthService {
  authenticateModel: AuthenticateModel={Email:null,password:null}
  authenticateResult: AuthenticateResultModel;

constructor(private service:ApiService,public router:Router,private activatedRoute:ActivatedRoute) { }
authenticate(finallyCallback?: () => void): void {
  finallyCallback = finallyCallback || (() => { });

  this.service
      .authenticate(this.authenticateModel).pipe(finalize(finallyCallback))

      .subscribe((result) => {

        console.log(result.token);


        this.processAuthenticateResult(result);



      });
}

private processAuthenticateResult(
  authenticateResult: AuthenticateResultModel
) {
  // console.log(authenticateResult.Token);


  this.authenticateResult = authenticateResult;

  if (authenticateResult.token) {
      // Successfully logged in
      this.login(
          authenticateResult.token,
          authenticateResult.email,
          authenticateResult.expiration,
          authenticateResult.userName,
          authenticateResult.roles,


      );
  } else {
      // Unexpected result!

      // this._logService.warn('Unexpected authenticateResult!');
      // this._router.navigate(['account/login']);
      console.log("rong rong   "+authenticateResult.message);

  }
}
  login(Token: string, Email: string, Expiration: number,UserName:string,Permissions:string[]=[]) {
    localStorage.setItem("token",Token);
    console.log("you are logged in"+ UserName);
    UserConstant.token=Token;
    this.service.getUserInfo().subscribe(result=>{
      UserConstant.email=result.email;
      UserConstant.roles=result.roles;
      UserConstant.permissions=result.permissions;
      UserConstant.userName=UserName;
      this.router.navigate(['/app/home']);
    },err=>{
      console.log(err);

    })





  }
  logOut(){
    localStorage.removeItem('token');
UserConstant.email='';
UserConstant.roles=[];
UserConstant.token='';
UserConstant.userName='';
UserConstant.permissions=[];


 this.router.navigate(['/auth/login'])


  }
  loggedIn():boolean{

    if(UserConstant.email){
      return true;
    }
    return false;
  }
  getEmail(){
    return UserConstant.email;
  }



}
