import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {Router} from '@angular/router'

import {closeArchiveAction} from 'src/app/board/store/actions/closeArchive.action'

@Injectable()
export class CloseArchiveEffect {
  closeArchive$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(closeArchiveAction),
        tap(({boardId}) => {
          this.router.navigate([`/board/${boardId}`])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private router: Router) {}
}
