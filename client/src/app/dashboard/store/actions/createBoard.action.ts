import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'
import {CreateBoardRequestInterface} from 'src/app/dashboard/types/createBoardRequest.interface'
import {BoardInterface} from 'src/app/shared/types/board.interface'

export const createBoardAction = createAction(
  ActionTypes.CREATE_BOARD,
  props<{request: CreateBoardRequestInterface}>()
)

export const createBoardSuccessAction = createAction(
  ActionTypes.CREATE_BOARD_SUCCESS,
  props<{board: BoardInterface}>()
)
