export class UserConstant {
  static id:string;
  static userName:string;
 static email:string;
 static roles:string[];
 static token :string;
 static permissions:string[];
 static  hasPermission(permission:string):boolean {

  return UserConstant.permissions.includes(permission);
 }

}
