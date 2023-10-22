import { AuthService } from './SharedService/Auth.service';
import { Component } from '@angular/core';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener }
    from "@angular/material/tree";
import { UserConstant } from 'src/Constants/UserConstant';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
selectedLink:string;
email=UserConstant.email;
userName=UserConstant.userName;
isSidebarOpend=false;
isToggled=true;
constructor(private authService:AuthService){
  console.log(UserConstant.email);


}

  goto(link:string){
this.selectedLink=link;

  }
  logout(){
this.authService.logOut();
  }
  sidebarToggle(){
   this.isSidebarOpend=!this.isSidebarOpend;
  }
showitems(){
this.isToggled=!this.isToggled;
}
}

