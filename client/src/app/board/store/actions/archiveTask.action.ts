import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const archiveTaskAction = createAction(
  ActionTypes.ARCHIVE_TASK,
  props<{taskId: string}>()
)

export const archiveTaskSuccessAction = createAction(
  ActionTypes.ARCHIVE_TASK_SUCCESS,
  props<{taskId: string}>()
)

export const archiveTaskFailureAction = createAction(
  ActionTypes.ARCHIVE_TASK_FAILURE,
  props<{backendErrorMessage: string}>()
)
