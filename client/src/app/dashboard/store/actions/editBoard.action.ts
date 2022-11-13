import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'
import {CreateBoardRequestInterface} from 'src/app/dashboard/types/createBoardRequest.interface'
import {BoardInterface} from 'src/app/shared/types/board.interface'

export const editBoardAction = createAction(
  ActionTypes.EDIT_BOARD,
  props<{request: CreateBoardRequestInterface; board: BoardInterface}>()
)

export const editBoardSuccessAction = createAction(
  ActionTypes.EDIT_BOARD_SUCCESS,
  props<{updatedBoard: BoardInterface}>()
)
