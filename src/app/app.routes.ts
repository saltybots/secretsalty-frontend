import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { authGuard } from './authentication/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingPageComponent},
  {path: 'profile', component: UserProfileComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
