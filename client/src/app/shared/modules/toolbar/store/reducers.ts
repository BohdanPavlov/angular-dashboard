import {Action, createReducer, on} from '@ngrx/store'

import {ToolbarStateInterface} from 'src/app/shared/modules/toolbar/types/toolbarState.interface'
import {changeSortModeAction} from 'src/app/shared/modules/toolbar/store/actions/changeSortMode.action'

const initialState: ToolbarStateInterface = {
  sortMode: ''
}

const toolbarReducer = createReducer(
  initialState,
  on(changeSortModeAction, (state: ToolbarStateInterface, action) => ({
    ...state,
    sortMode: action.sortMode
  }))
)

export function reducer(state: ToolbarStateInterface, action: Action) {
  return toolbarReducer(state, action)
}
