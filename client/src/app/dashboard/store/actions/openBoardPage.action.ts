import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'
import {BoardInterface} from 'src/app/shared/types/board.interface'

export const openBoardPageAction = createAction(
  ActionTypes.OPEN_BOARD_PAGE,
  props<{currentBoard: BoardInterface}>()
)
