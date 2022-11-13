import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {BoardService} from 'src/app/board/services/board.service'
import {
  archiveTaskAction,
  archiveTaskFailureAction,
  archiveTaskSuccessAction
} from 'src/app/board/store/actions/archiveTask.action'

@Injectable()
export class ArchiveTaskEffect {
  archiveTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(archiveTaskAction),
      switchMap(({taskId}) => {
        return this.boardService.archiveTask(taskId).pipe(
          map(() => {
            return archiveTaskSuccessAction({taskId})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              archiveTaskFailureAction({
                backendErrorMessage: errorResponse.error.message
              })
            )
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
