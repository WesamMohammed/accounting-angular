export class IdentityRole{
  roleId:string;
  roleName:string;
}
export class ManageRolePermissionsViewModel{
  roleId:string;
  roleName:string;
  rolePermissions:RolePermissionsViewModel[];

}
export class RolePermissionsViewModel{
  type:string;
  value:string;
  selected:boolean;
}

