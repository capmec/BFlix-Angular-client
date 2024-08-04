import { Component, OnInit } from '@angular/core'
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { GenreInfoComponent } from '../genre-info/genre-info.component'
import { DirectorInfoComponent } from '../director-info/director-info.component'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = []
  favoritemovie: any[] = []
  user: any = {}

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies()
    this.getFavorites()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp
      //console.log('movies from API', this.movies)
    })
  }

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

  isFav(movie: any): boolean {
    return (
      Array.isArray(this.favoritemovie) &&
      this.favoritemovie.some((favMovie) => favMovie._id === movie._id)
    )
  }

  toggleFav(movie: any): void {
    const isFavorite = this.isFav(movie)
    isFavorite ? this.deleteFavMovies(movie) : this.addFavMovies(movie)
  }

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
