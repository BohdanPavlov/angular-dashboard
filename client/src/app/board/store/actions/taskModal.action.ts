import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'
import {ListInterface} from 'src/app/shared/types/list.interface'
import {TaskInterface} from 'src/app/shared/types/task.interface'

export const openAddTaskModalAction = createAction(
  ActionTypes.OPEN_ADD_TASK_MODAL,
  props<{currentList: ListInterface}>()
)

export const openEditTaskModalAction = createAction(
  ActionTypes.OPEN_EDIT_TASK_MODAL,
  props<{currentTask: TaskInterface}>()
)

export const closeTaskModalAction = createAction(ActionTypes.CLOSE_TASK_MODAL)
