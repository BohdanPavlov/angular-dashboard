import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'
import {BoardInterface} from 'src/app/shared/types/board.interface'

export const selectBoardAction = createAction(
  ActionTypes.SELECT_BOARD,
  props<{currentBoard: BoardInterface}>()
)
