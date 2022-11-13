import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'

import {BoardService} from 'src/app/board/services/board.service'
import {
  getListsAction,
  getListsFailureAction,
  getListsSuccessAction
} from 'src/app/board/store/actions/getLists.action'
import {GetListsResponseInterface} from 'src/app/board/types/getListsResponse.interface'

@Injectable()
export class GetListsEffect {
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getListsAction),
      switchMap(({boardId}) => {
        return this.boardService.getLists(boardId).pipe(
          map((response: GetListsResponseInterface) => {
            return getListsSuccessAction({response})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              getListsFailureAction({
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
