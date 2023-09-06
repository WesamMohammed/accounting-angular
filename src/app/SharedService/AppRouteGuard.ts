import { UserConstant } from 'src/Constants/UserConstant';
import { AuthService } from './Auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import { PermissionCheckerService } from 'abp-ng2-module';
// import { AppSessionService } from '../session/app-session.service';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    UrlTree
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate,CanActivateChild {

  constructor(private router:Router,private authService:AuthService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/auth/login']);
return false;
    }
    if(!route.data ||!route.data['permission']){
      return true
    }
    console.log(UserConstant.roles.includes(route.data['permission']));
    if(UserConstant.hasPermission(route.data['permission'])){
      return true;
    }

    this.router.navigate(['/app/home']);
return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }
}

