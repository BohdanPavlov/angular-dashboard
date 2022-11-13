import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/shared/modules/toolbar/store/actionTypes'

export const changeSortModeAction = createAction(
  ActionTypes.CHANGE_SORT_MODE,
  props<{sortMode: string}>()
)
