import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const sortTasksAction = createAction(
  ActionTypes.SORT_TASKS,
  props<{sortMode: string; sortParam: string}>()
)
