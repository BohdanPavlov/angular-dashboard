import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'
import {BoardInterface} from 'src/app/shared/types/board.interface'

export const deleteBoardAction = createAction(
  ActionTypes.DELETE_BOARD,
  props<{currentBoard: BoardInterface}>()
)

export const deleteBoardSuccessAction = createAction(
  ActionTypes.DELETE_BOARD_SUCCESS,
  props<{currentBoard: BoardInterface}>()
)
