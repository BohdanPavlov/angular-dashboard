import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs'

import {BoardService} from 'src/app/board/services/board.service'
import {
  changeTaskListAction,
  changeTaskListSuccessAction
} from 'src/app/board/store/actions/changeTaskList.action'

@Injectable()
export class ChangeTaskListEffect {
  changeTaskList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeTaskListAction),
      switchMap(({listId, taskId}) => {
        return this.boardService.changeTaskList(listId, taskId).pipe(
          map(() => {
            return changeTaskListSuccessAction({listId, taskId})
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
