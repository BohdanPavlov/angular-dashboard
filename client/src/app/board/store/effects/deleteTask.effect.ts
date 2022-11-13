import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {BoardService} from 'src/app/board/services/board.service'
import {
  deleteTaskAction,
  deleteTaskFailureAction,
  deleteTaskFromArchiveAction,
  deleteTaskFromArchiveFailureAction,
  deleteTaskFromArchiveSuccessAction,
  deleteTaskSuccessAction
} from 'src/app/board/store/actions/deleteTask.action'

@Injectable()
export class DeleteTaskEffect {
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskAction),
      switchMap(({taskId}) => {
        return this.boardService.deleteTask(taskId).pipe(
          map(() => {
            return deleteTaskSuccessAction({taskId})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteTaskFailureAction({
                backendErrorMessage: errorResponse.error.message
              })
            )
          })
        )
      })
    )
  )

  deleteTaskFromArchive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTaskFromArchiveAction),
      switchMap(({taskId}) => {
        return this.boardService.deleteTask(taskId).pipe(
          map(() => {
            return deleteTaskFromArchiveSuccessAction({taskId})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteTaskFromArchiveFailureAction({
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
