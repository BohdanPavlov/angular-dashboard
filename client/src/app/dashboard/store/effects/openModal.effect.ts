import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

import {openModalAction} from 'src/app/dashboard/store/actions/openModal.action'

@Injectable()
export class OpenModalEffect {
  openModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openModalAction),
        tap(() => {
          this.router.navigate(['/dashboard/add-board'])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private router: Router) {}
}
