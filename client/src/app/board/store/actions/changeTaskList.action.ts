import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const changeTaskListAction = createAction(
  ActionTypes.CHANGE_TASK_LIST,
  props<{listId: string; taskId: string}>()
)

export const changeTaskListSuccessAction = createAction(
  ActionTypes.CHANGE_TASK_LIST_SUCCESS,
  props<{listId: string; taskId: string}>()
)
