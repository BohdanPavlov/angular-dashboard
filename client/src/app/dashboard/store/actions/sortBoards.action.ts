import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'

export const sortBoardsAction = createAction(
  ActionTypes.SORT_BOARDS,
  props<{sortMode: string; sortParam: string}>()
)
