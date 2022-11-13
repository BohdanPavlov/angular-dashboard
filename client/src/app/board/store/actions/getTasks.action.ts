import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'
import {TaskInterface} from 'src/app/shared/types/task.interface'

export const getTasksAction = createAction(
  ActionTypes.GET_TASKS,
  props<{boardId: string}>()
)

export const getTasksSuccessAction = createAction(
  ActionTypes.GET_TASKS_SUCCESS,
  props<{tasks: TaskInterface[]}>()
)

export const getTasksFailureAction = createAction(
  ActionTypes.GET_TASKS_FAILURE,
  props<{backendErrorMessage: string}>()
)
