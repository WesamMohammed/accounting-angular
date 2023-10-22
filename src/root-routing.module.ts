import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo:'/app/home' , pathMatch: 'full' },
    
    {
        path: 'app',
        loadChildren: () => import('./app/app.module').then(m => m.AppModule), // Lazy load account module
        data: { preload: true }
    },
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), // Lazy load account module
      data: { preload: true }
  },
    {
        path:'**',
        redirectTo:'/app/home',pathMatch:'full'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
