import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const filterTasksAction = createAction(
  ActionTypes.FILTER_TASKS,
  props<{filter: string}>()
)
