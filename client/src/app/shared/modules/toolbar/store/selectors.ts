import {createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {ToolbarStateInterface} from 'src/app/shared/modules/toolbar/types/toolbarState.interface'

export const toolbarFeatureSelector = (
  state: AppStateInterface
): ToolbarStateInterface => state.toolbar

export const sortModeSelector = createSelector(
  toolbarFeatureSelector,
  (state: ToolbarStateInterface) => state.sortMode
)
