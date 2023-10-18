import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '', 
    component: UsersComponent,
  },
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
