import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs'

import {DashboardService} from 'src/app/dashboard/services/dashboard.service'
import {
  deleteBoardAction,
  deleteBoardSuccessAction
} from 'src/app/dashboard/store/actions/deleteBoard.action'

@Injectable()
export class DeleteBoardEffect {
  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoardAction),
      switchMap(({currentBoard}) => {
        return this.dashboardService.deleteBoard(currentBoard._id).pipe(
          map(() => {
            return deleteBoardSuccessAction({currentBoard})
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
