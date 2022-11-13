import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Router} from '@angular/router'
import {tap} from 'rxjs'

import {openBoardPageAction} from 'src/app/dashboard/store/actions/openBoardPage.action'

@Injectable()
export class OpenBoardPageEffect {
  openBoardPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openBoardPageAction),
        tap(({currentBoard}): void => {
          this.router.navigate([`/board/${currentBoard._id}`])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private router: Router) {}
}
