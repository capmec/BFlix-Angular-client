import { Component, OnInit } from '@angular/core'
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component'
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component'
import { MatDialog } from '@angular/material/dialog'

/**
 * Component for the navigation bar displayed at the top of the application.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Constructor for the WelcomePageComponent.
   * @param dialog - Instance of MatDialog used to open dialogs.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {}

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
   * Sets the width of the dialog to 400px and the height to 300px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px',
      height: '300px',
    })
  }
}
