export interface Action{
    name?:string,
    icon?:string,
    command?:Act,
    data?:any
  }
  export interface Act{
    (data?:any):any;
  }