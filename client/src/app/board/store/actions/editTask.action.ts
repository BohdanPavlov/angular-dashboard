import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const editTaskAction = createAction(
  ActionTypes.EDIT_TASK,
  props<{taskId: string; newName: string}>()
)

export const editTaskSuccessAction = createAction(
  ActionTypes.EDIT_TASK_SUCCESS,
  props<{taskId: string; newName: string}>()
)

export const editTaskFailureAction = createAction(
  ActionTypes.EDIT_TASK_FAILURE,
  props<{backendErrorMessage: string}>()
)
