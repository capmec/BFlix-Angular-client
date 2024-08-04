import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

/**
 *  displaying genre and actors information in a dialog.
 */
@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss'],
})
export class GenreInfoComponent implements OnInit {
  /**
   * Constructor for GenreInfoComponent.
   * @param data - Data injected into the component containing genre and actors information.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      genre: string
      description: string
      actors: string[]
    }
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}
}
