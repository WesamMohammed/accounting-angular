import { UserConstant } from 'src/Constants/UserConstant';
import { Component, Injector, OnInit } from '@angular/core';
import { NavigationEnd, PRIMARY_OUTLET, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { AppComponentBase } from 'src/app/AppComponentBase';
import { MenuItem } from 'src/app/Models/menuItem';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
 menuItems:MenuItem[];
 menuItemsMap: { [key: number]: MenuItem } = {};
 activatedMenuItems:MenuItem[]=[];
 routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
 homeRoute = '/app/home';
 isSideBarOpen=false;
  constructor(injector:Injector,private router:Router) {

    super(injector);
    this.router.events.subscribe(event=>{
      this.routerEvents.next(<RouterEvent>event);
    })

   }

  ngOnInit(): void {
    this.menuItems=this.getMenuItems();
    this.fixingMenuItems(this.menuItems);
    this.routerEvents.pipe(filter((event)=>event instanceof NavigationEnd)).subscribe((event)=>{
      const currentUrl = event.url !== '/' ? event.url : "/app/accounts";
      const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
          .children[PRIMARY_OUTLET];

console.log('logOUUUUUUUUUt');

          if (primaryUrlSegmentGroup) {




            this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());

        }

    });

  }
  getMenuItems(){
    return [

      new MenuItem("Home","/app/home","fas fa-home"),
      new MenuItem("Sales","/app/sales","fas fa-cart-plus","Permission.Sales.View"),

      new MenuItem("ReturnSales","/app/returnsales","fas fa-cart-plus","Permission.Sales.View"),
      new MenuItem("Purchases","/app/purchases","fas fa-cart-plus","Permission.Purchases.View"),
      new MenuItem("Products","/app/products","fas fa-shopping-bag","Permission.Products.View"),
      new MenuItem("Accounts","/app/accounts","fas fa-home","Permission.Accounts.View"),
      new MenuItem("Customers","/app/customers","fas fa-users","Permission.Customers.View"),

      new MenuItem("Roles","/app/roles","fas fa-universal-access","Permission.Roles.View"),
      new MenuItem("Users","/app/users","fas fa-user-plus","Permission.Users.View"),
      new MenuItem("Multiple Level","","fas fa-circle","",[

        new MenuItem("logout","/auth/logout","fas fa-home"),
      ])




  ];
  }
  fixingMenuItems(items:MenuItem[],parentId?:number){
    items.forEach((item:MenuItem,index:number)=>{
item.id=parentId?Number(parentId+'' +index+1):index + 1;
if(parentId){
  item.parentId=parentId;
}
if(parentId||item.children){
  this.menuItemsMap[item.id]=item;
}
if(item.children){
  this.fixingMenuItems(item.children,item.id);
}
    });
  }
  activateMenuItems(url:string):void{
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems=[];
    const foundedItems=this.findMenuItemsByUrl(url,this.menuItems);
    foundedItems?.forEach((item)=>{



      this.activateMenuItem(item);


    })

  }
  deactivateMenuItems(items:MenuItem[]){
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
          this.deactivateMenuItems(item.children);
      }
  });
  }
  findMenuItemsByUrl(url:string,items:MenuItem[],foundedItems:MenuItem[]=[]):MenuItem[] {
    items.forEach((item:MenuItem)=>{
      if(item.route===url){


        foundedItems?.push(item);
      }
      else if(item.children){
        this.findMenuItemsByUrl(url,item.children,foundedItems)
      }
    });
    console.log(foundedItems);

    foundedItems?.forEach((item)=>{
      console.log(item.label+item.route+item.isActive);

    })

    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    // if (item.children) {
    //     item.isCollapsed = false;
    // }
    // this.activatedMenuItems.push(item);
    // if (item.parentId) {
    //     this.activateMenuItem(this.menuItemsMap[item.parentId]);
    // }
}
activating(item:MenuItem){
  this.deactivateMenuItems(this.menuItems);
  item.isActive=true;
  console.log("Activating");


}
isMenuItemVisible(item: MenuItem): boolean {
  if (!item.permissionName) {
      return true;
  }
  // return this.permission.isGranted(item.permissionName);
  return UserConstant.hasPermission(item.permissionName)
 // return true;
}
toggle(event:any){

  event.target.parentElement.querySelector(".nested").classList.toggle("active");
  event.target.classList.toggle("caret-down")

 }
}
