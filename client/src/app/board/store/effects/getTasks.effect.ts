import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {BoardService} from 'src/app/board/services/board.service'
import {
  getTasksAction,
  getTasksFailureAction,
  getTasksSuccessAction
} from 'src/app/board/store/actions/getTasks.action'
import {TaskInterface} from 'src/app/shared/types/task.interface'

@Injectable()
export class GetTasksEffect {
  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTasksAction),
      switchMap(({boardId}) => {
        return this.boardService.getTasks(boardId).pipe(
          map((tasks: TaskInterface[]) => {
            return getTasksSuccessAction({tasks})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getTasksFailureAction({
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
