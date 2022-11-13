import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {AddTaskRequestInterface} from 'src/app/board/types/addTaskRequest.interface'

export const addTaskAction = createAction(
  ActionTypes.ADD_TASK,
  props<{request: AddTaskRequestInterface}>()
)

export const addTaskSuccessAction = createAction(
  ActionTypes.ADD_TASK_SUCCESS,
  props<{newTask: TaskInterface}>()
)

export const addTaskFailureAction = createAction(
  ActionTypes.ADD_TASK_FAILURE,
  props<{backendErrorMessage: string}>()
)
