import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "myaccount", component: UserPageComponent },
  { path: "user/:uuid", component: UserPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
