import { Component, OnInit } from '@angular/core'
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { GenreInfoComponent } from '../genre-info/genre-info.component'
import { DirectorInfoComponent } from '../director-info/director-info.component'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {}
  favoritemovie: any[] = []
  formUserData: any = {}
  favoriteMoviesIDs: string[] = []

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProfile()
    this.getUser()
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe(
      (response) => {
        this.user = response
        this.formUserData = { ...response } // Clone the user data for editing
      },
      (error) => {
        console.error('Error retrieving user data:', error)
      }
    )
  }

  getProfile(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      console.log('result:', result)
      this.user = result
      this.formUserData.username = this.user.username
      this.formUserData.email = this.user.email
      if (this.user.birthday) {
        let birthday = new Date(this.user.birthday)
        if (!isNaN(birthday.getTime())) {
          this.formUserData.birthday = birthday.toISOString().split('T')[0]
        }
      }
      this.favoriteMoviesIDs = this.user.favoriteMovies

      this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
        this.favoritemovie = movies.filter((movie: any) =>
          this.favoriteMoviesIDs.includes(movie._id)
        )
      })
    })
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.formUserData).subscribe(
      (response) => {
        console.log('User updated successfully', response)
        this.snackBar.open('User information updated successfully.', 'OK', {
          duration: 3000,
        })
        this.userService.updateUser(response) // Update user in UserService
        this.getUser() // Refresh the user data
      },
      (error) => {
        console.error('Error updating user information:', error)
        this.snackBar.open('Error updating user information.', 'OK', {
          duration: 3000,
        })
      }
    )
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      (response) => {
        console.log('User deleted successfully', response)
        localStorage.clear() // Clear all local storage
        this.router.navigate(['welcome']).then(() => {
          this.snackBar.open('User deleted successfully.', 'OK', {
            duration: 3000,
          })
        })
      },
      (error) => {
        console.error('Error deleting user:', error)
        this.snackBar.open('Error deleting user.', 'OK', {
          duration: 3000,
        })
      }
    )
  }

  toggleFav(movie: any): void {
    const isFavorite = this.favoriteMoviesIDs.includes(movie._id)
    if (isFavorite) {
      this.removeFavorite(movie._id)
    } else {
      this.addFavorite(movie._id)
    }
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovies(this.user._id, movieId).subscribe(
      (resp) => {
        this.favoriteMoviesIDs.push(movieId)
        this.getProfile() // Refresh favorite movies
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 3000,
        })
      },
      (error) => {
        console.error('Error adding favorite movie:', error)
        this.snackBar.open('Failed to add movie to favorites', 'OK', {
          duration: 3000,
        })
      }
    )
  }

  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.user._id, movieId).subscribe(
      (resp) => {
        this.favoriteMoviesIDs = this.favoriteMoviesIDs.filter(
          (id) => id !== movieId
        )
        this.getProfile() // Refresh favorite movies
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 3000,
        })
      },
      (error) => {
        console.error('Error removing favorite movie:', error)
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 3000,
        })
      }
    )
  }

  openGenreDialog(genre: string, description: string, actors: string[]): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        genre: genre,
        description: description,
        actors: actors,
      },
      width: '500px',
    })
  }

  openDirectorDialog(director: string, bio: string, birthdate: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        name: director,
        bio: bio,
        birth: birthdate,
      },
      width: '500px',
    })
  }
}
