import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path : "register", component:  SignUpComponent},
  //{path : "", redirectTo:"/signup" , pathMatch: "full"},

  {path: "seconnecter", component: SignInComponent},

{path: "userprofile", component: UserProfileComponent,canActivate:[AuthGuard]},
{path: "addPublication", component: AddProfileComponent,canActivate:[AuthGuard]},

{path: '', redirectTo: "seconnecter", pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
