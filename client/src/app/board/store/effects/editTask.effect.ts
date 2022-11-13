import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {BoardService} from 'src/app/board/services/board.service'
import {
  editTaskAction,
  editTaskFailureAction,
  editTaskSuccessAction
} from 'src/app/board/store/actions/editTask.action'

@Injectable()
export class EditTaskEffect {
  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTaskAction),
      switchMap(({taskId, newName}) => {
        return this.boardService.editTask(taskId, newName).pipe(
          map(() => {
            return editTaskSuccessAction({taskId, newName})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editTaskFailureAction({
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
