import { Component, OnInit, Input } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' }

  /**
   * Constructs the UserRegistrationFormComponent.
   * @param fetchApiData - The service for fetching API data.
   * @param dialogRef - The reference to the dialog.
   * @param snackBar - The service for showing snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user.
   * If successful, closes the dialog and shows a success notification.
   * If registration fails, shows a failure notification.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response) => {
        this.dialogRef.close()
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        })
      },
      error: (err) => {
        console.error('User registration failed:', err.message)
        this.snackBar.open('User registration failed: ' + err.message, 'OK', {
          duration: 2000,
        })
      },
      complete: () => console.log('Registration process completed'),
    })
  }
}
