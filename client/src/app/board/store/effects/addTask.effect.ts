import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {HttpErrorResponse} from '@angular/common/http'
import {catchError, map, of, switchMap} from 'rxjs'

import {
  addTaskAction,
  addTaskFailureAction,
  addTaskSuccessAction
} from 'src/app/board/store/actions/addTask.action'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {BoardService} from 'src/app/board/services/board.service'

@Injectable()
export class AddTaskEffect {
  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTaskAction),
      switchMap(({request}) => {
        return this.boardService.addTask(request).pipe(
          map((newTask: TaskInterface) => {
            return addTaskSuccessAction({newTask})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              addTaskFailureAction({
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
