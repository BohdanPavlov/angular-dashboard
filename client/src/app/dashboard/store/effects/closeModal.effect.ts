import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

import {closeModalAction} from 'src/app/dashboard/store/actions/closeModal.action'

@Injectable()
export class CloseModalEffect {
  closeModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(closeModalAction),
        tap(() => {
          this.router.navigate(['/dashboard'])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private router: Router) {}
}
