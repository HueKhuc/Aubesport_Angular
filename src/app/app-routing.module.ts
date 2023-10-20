import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AuthGuard } from './services/authGuard';
<<<<<<< HEAD
import { TournamentComponent } from './components/tournament/tournament.component';
=======
import { HomeComponent } from './home/home.component';
>>>>>>> a8893a9 (finalisation du header et création du homeComponent)

const routes: Routes = [
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginPageComponent },
  { path: "myaccount", component: UserPageComponent, canActivate: [AuthGuard] },
  { path: "user/:uuid", component: UserPageComponent, canActivate: [AuthGuard] },
  { path: "inscription", component: InscriptionComponent },
<<<<<<< HEAD
  { path: "tournament", component: TournamentComponent, canActivate: [AuthGuard] },
];
=======
  { path: 'home', component: HomeComponent },
]
>>>>>>> a8893a9 (finalisation du header et création du homeComponent)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
