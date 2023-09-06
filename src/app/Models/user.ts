export class IdentityUser{
userId:string;
userName:string;
email:string;
}
export class ManageUserRolesViewModel
{
    userId:string;
    userName :string;
     email:string;
     userRoles:UserRolesViewModel[];

}
export class UserRolesViewModel
{
    roleName:string;
    selected:boolean;
}
