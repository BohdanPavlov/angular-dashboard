import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {Router} from '@angular/router'

import {openArchiveAction} from 'src/app/board/store/actions/openArchive.action'

@Injectable()
export class OpenArchiveEffect {
  openArchive$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openArchiveAction),
        tap(({boardId}) => {
          this.router.navigate([`/board/${boardId}/archive`])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private router: Router) {}
}
