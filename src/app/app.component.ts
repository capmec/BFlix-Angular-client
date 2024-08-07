// src/app/app.component.ts
import { Component } from '@angular/core'
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'
import { UserLoginFormComponent } from './user-login-form/user-login-form.component'
import { MatDialog } from '@angular/material/dialog'
import { MovieCardComponent } from './movie-card/movie-card.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BFlix-Angular-client'

  /**
   * Constructs the AppComponent.
   * @param dialog - The reference to the dialog service.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Opens the User Registration dialog.
   * Sets the width of the dialog to 280px.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    })
  }

  /**
   * Opens the User Login dialog.
   * Sets the width of the dialog to 280px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    })
  }

  /**
   * Opens the Movies dialog.
   * Sets the width of the dialog to 500px.
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    })
  }
}
