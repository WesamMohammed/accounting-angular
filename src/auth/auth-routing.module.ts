import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
{path:'',redirectTo:'/auth/login',pathMatch:'full'},
    {

        path: 'login',component:AuthComponent


    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule { }
