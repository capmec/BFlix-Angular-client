import { Injectable } from '@angular/core'
import { catchError } from 'rxjs/operators'
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map } from 'rxjs/operators'

//const apiUrl = 'http://localhost:8080/'
const apiUrl = 'https://movie-api-o5p9.onrender.com/'

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    if (
      !userDetails ||
      !userDetails.username ||
      !userDetails.password ||
      !userDetails.email
    ) {
      return throwError(() => new Error('User details are incomplete.'))
    }

    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError))
  }

  public userLogin(userDetails: any): Observable<any> {
    //console.log('Login details:', userDetails)
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map((response: any) => {
        // console.log('Login response:', response)
        return response
      }),
      catchError(this.handleError)
    )
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(`${apiUrl}movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    return this.http
      .get(apiUrl + 'users/' + user._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  getFavoriteMovies(userId: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .get(`${apiUrl}users/${userId}/favoriteMovies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  addFavoriteMovies(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .post(`${apiUrl}users/${userId}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  deleteFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .delete(`${apiUrl}users/${userId}/movies/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http
      .put(apiUrl + 'users/' + userDetails._id, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const token = localStorage.getItem('token')
    return this.http
      .delete(apiUrl + 'users/' + user._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError))
  }

  private extractResponseData(res: object): any {
    const body = res
    return body || {}
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!'
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`
    } else {
      if (error.status === 0) {
        errorMessage = 'No response from the server. Please try again later.'
      } else if (error.status === 422) {
        errorMessage =
          'Validation error: Please check the data you have entered.'
      } else {
        errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`
      }
    }
    console.error(errorMessage)
    return throwError(() => new Error(errorMessage))
  }
}
