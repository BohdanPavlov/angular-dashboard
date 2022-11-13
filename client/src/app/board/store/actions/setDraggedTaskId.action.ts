import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const setDraggedTaskIdAction = createAction(
  ActionTypes.SET_DRAGGED_TASK_ID,
  props<{taskId: string}>()
)
