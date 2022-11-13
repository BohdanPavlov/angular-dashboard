import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs'

import {DashboardService} from 'src/app/dashboard/services/dashboard.service'
import {BoardInterface} from 'src/app/shared/types/board.interface'
import {
  createBoardAction,
  createBoardSuccessAction
} from 'src/app/dashboard/store/actions/createBoard.action'

@Injectable()
export class CreateBoardEffect {
  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBoardAction),
      switchMap(({request}) => {
        return this.dashboardService.createBoard(request).pipe(
          map((board: BoardInterface) => {
            return createBoardSuccessAction({board})
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
