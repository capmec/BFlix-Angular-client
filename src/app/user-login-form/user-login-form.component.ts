import { Component, OnInit, Input } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
  }

  /**
   * Constructs the UserLoginFormComponent.
   * @param fetchApiData - The service for fetching API data.
   * @param dialogRef - The reference to the dialog.
   * @param snackBar - The service for showing snack bar notifications.
   * @param router - The router service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user.
   * If successful, saves user data and token in local storage, closes the dialog,
   * shows a success notification, and navigates to the movies page.
   * If login fails, shows a failure notification.
   */
  loginUser(): void {
    //console.log('Login data:', this.userData) // Log the userData object
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        //console.log('Login successful:', result) // Log the successful response
        localStorage.setItem('user', JSON.stringify(result.user))
        localStorage.setItem('token', result.token)
        this.dialogRef.close()
        this.snackBar.open('Login successful!', 'OK', { duration: 2000 })
        this.router.navigate(['movies'])
      },
      error: (error) => {
        console.error('Login failed:', error) // Log the error response
        const errorMessage =
          error.error?.message || 'Login failed. Please try again.'
        this.snackBar.open(errorMessage, 'OK', { duration: 2000 })
      },
    })
  }
}
