import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'

export const filterBoardsAction = createAction(
  ActionTypes.FILTER_BOARDS,
  props<{filter: string}>()
)
