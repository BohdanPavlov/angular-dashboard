import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const deleteTaskAction = createAction(
  ActionTypes.DELETE_TASK,
  props<{taskId: string}>()
)

export const deleteTaskSuccessAction = createAction(
  ActionTypes.DELETE_TASK_SUCCESS,
  props<{taskId: string}>()
)

export const deleteTaskFailureAction = createAction(
  ActionTypes.DELETE_TASK_FAILURE,
  props<{backendErrorMessage: string}>()
)

export const deleteTaskFromArchiveAction = createAction(
  ActionTypes.DELETE_TASK_FROM_ARCHIVE,
  props<{taskId: string}>()
)

export const deleteTaskFromArchiveSuccessAction = createAction(
  ActionTypes.DELETE_TASK_FROM_ARCHIVE_SUCCESS,
  props<{taskId: string}>()
)

export const deleteTaskFromArchiveFailureAction = createAction(
  ActionTypes.DELETE_TASK_FROM_ARCHIVE_FAILURE,
  props<{backendErrorMessage: string}>()
)
