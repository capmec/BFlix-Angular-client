// Import necessary modules
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// Import Angular Material modules
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MatToolbarModule } from '@angular/material/toolbar'
import { DialogModule } from '@angular/cdk/dialog'
import { MatMenuModule } from '@angular/material/menu'

// Import application specific modules^

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'
import { MovieCardComponent } from './movie-card/movie-card.component'
import { WelcomePageComponent } from './welcome-page/welcome-page.component'
import { NavbarComponent } from './navbar/navbar.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { DirectorInfoComponent } from './director-info/director-info.component'
import { GenreInfoComponent } from './genre-info/genre-info.component'

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
]

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    NavbarComponent,
    UserProfileComponent,
    DirectorInfoComponent,
    GenreInfoComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    DialogModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
