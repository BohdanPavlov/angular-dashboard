import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs'

import {DashboardService} from 'src/app/dashboard/services/dashboard.service'
import {
  getBoardsAction,
  getBoardsSuccessAction
} from 'src/app/dashboard/store/actions/getBoards.action'
import {BoardInterface} from 'src/app/shared/types/board.interface'

@Injectable()
export class GetBoardsEffect {
  getBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBoardsAction),
      switchMap(() => {
        return this.dashboardService.fetchBoards().pipe(
          map((boards: BoardInterface[]) => {
            return getBoardsSuccessAction({boards})
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
