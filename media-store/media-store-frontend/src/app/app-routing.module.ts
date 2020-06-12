import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSiteComponent} from './user-site/user-site.component';
import {AdminSiteComponent} from './admin-site/admin-site.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: UserSiteComponent },
  { path: 'admin', component: AdminSiteComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
