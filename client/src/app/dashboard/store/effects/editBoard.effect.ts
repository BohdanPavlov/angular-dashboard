import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs'

import {DashboardService} from 'src/app/dashboard/services/dashboard.service'

import {
  editBoardAction,
  editBoardSuccessAction
} from 'src/app/dashboard/store/actions/editBoard.action'

@Injectable()
export class EditBoardEffect {
  editBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBoardAction),
      switchMap(({request, board}) => {
        return this.dashboardService.editBoard(request, board?._id).pipe(
          map(() => {
            const updatedBoard = {
              ...board,
              name: request.name,
              description: request.description
            }
            return editBoardSuccessAction({updatedBoard})
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
