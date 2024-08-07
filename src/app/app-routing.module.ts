import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MovieCardComponent } from './movie-card/movie-card.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { WelcomePageComponent } from './welcome-page/welcome-page.component'

const routes: Routes = [
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
]

/**
 * Module for app routing.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
