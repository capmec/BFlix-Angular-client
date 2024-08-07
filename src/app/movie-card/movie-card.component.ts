import { Component, OnInit } from '@angular/core'
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { GenreInfoComponent } from '../genre-info/genre-info.component'
import { DirectorInfoComponent } from '../director-info/director-info.component'

/**
 * Component for displaying a list of movies and managing favorite movies.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []
  favoritemovie: any[] = []
  user: any = {}

  /**
   * Constructor for the MovieCardComponent.
   * @param fetchApiData - Service for fetching API data.
   * @param dialog - Instance of MatDialog used to open dialogs.
   * @param snackBar - Instance of MatSnackBar used to show snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.getMovies()
    this.getFavorites()
  }

  /**
   * Fetches the list of movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp
      //console.log('movies from API', this.movies)
    })
  }

  /**
   * Fetches the list of favorite movies for the logged-in user from the API.
   */
  getFavorites(): void {
    const user = localStorage.getItem('user')
    if (user) {
      const parsedUser = JSON.parse(user)
      this.user = parsedUser // Store the user information
      this.fetchApiData.getFavoriteMovies(parsedUser._id).subscribe(
        (resp: any) => {
          this.favoritemovie = Array.isArray(resp) ? resp : []
          //console.log('favorite movies from API', this.favoritemovie)
        },
        (error) => {
          console.error('Error fetching favorite movies:', error)
          this.snackBar.open('Failed to fetch favorite movies', 'OK', {
            duration: 3000,
          })
        }
      )
    }
  }

  /**
   * Opens the Genre Information dialog.
   * @param genre - The genre of the movie.
   * @param description - The description of the genre.
   * @param actors - The actors associated with the genre.
   */
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

  /**
   * Opens the Director Information dialog.
   * @param director - The name of the director.
   * @param bio - The biography of the director.
   * @param birthdate - The birthdate of the director.
   */
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

  /**
   * Checks if a movie is in the user's favorite list.
   * @param movie - The movie to check.
   * @returns True if the movie is a favorite, false otherwise.
   */
  isFav(movie: any): boolean {
    return (
      Array.isArray(this.favoritemovie) &&
      this.favoritemovie.some((favMovie) => favMovie._id === movie._id)
    )
  }

  /**
   * Toggles the favorite status of a movie.
   * @param movie - The movie to toggle.
   */
  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie)
    isFavorite ? this.deleteFavMovies(movie) : this.addFavMovies(movie)
  }

  /**
   * Adds a movie to the user's favorite list.
   * @param movie - The movie to add.
   */
  addFavMovies(movie: any): void {
    if (this.user && this.user._id) {
      this.fetchApiData.addFavoriteMovies(this.user._id, movie._id).subscribe(
        (resp) => {
          //console.log('server response:', resp)
          this.favoritemovie.push(movie)
          this.snackBar.open(
            `${movie.title} has been added to your favorites`,
            'OK',
            {
              duration: 3000,
            }
          )
        },
        (error) => {
          console.error('Error adding favorite movie:', error)
          this.snackBar.open(
            `Failed to add ${movie.title} to your favorites`,
            'OK',
            {
              duration: 3000,
            }
          )
        }
      )
    }
  }

  /**
   * Removes a movie from the user's favorite list.
   * @param movie - The movie to remove.
   */
  deleteFavMovies(movie: any): void {
    if (this.user && this.user._id) {
      this.fetchApiData.deleteFavoriteMovie(this.user._id, movie._id).subscribe(
        (resp) => {
          this.favoritemovie = this.favoritemovie.filter(
            (favMovie) => favMovie._id !== movie._id
          )
          this.snackBar.open(
            `${movie.title} has been removed from your favorites`,
            'OK',
            {
              duration: 3000,
            }
          )
        },
        (error) => {
          console.error('Error removing favorite movie:', error)
          this.snackBar.open(
            `Failed to remove ${movie.title} from your favorites`,
            'OK',
            {
              duration: 3000,
            }
          )
        }
      )
    }
  }
}
