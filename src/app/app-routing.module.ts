import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AuthGuard } from './services/authGuard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPageComponent },
  { path: "myaccount", component: UserPageComponent, canActivate: [AuthGuard] },
  { path: "user/:uuid", component: UserPageComponent, canActivate: [AuthGuard] },
  { path: "inscription", component: InscriptionComponent },
  { path: 'home', component: HomeComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
