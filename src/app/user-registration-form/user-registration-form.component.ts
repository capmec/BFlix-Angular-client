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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
