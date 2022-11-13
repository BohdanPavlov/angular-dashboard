import {createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {DashboardStateInterface} from 'src/app/dashboard/types/dashboardState.interface'

export const dashboardFeatureSelector = (
  state: AppStateInterface
): DashboardStateInterface => state.dashboard

export const boardsSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardStateInterface) => dashboardState.boards
)

export const currentBoardSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardStateInterface) => dashboardState.currentBoard
)
