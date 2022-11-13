import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'
import {BoardInterface} from 'src/app/shared/types/board.interface'

export const getBoardsAction = createAction(ActionTypes.GET_BOARDS)

export const getBoardsSuccessAction = createAction(
  ActionTypes.GET_BOARDS_SUCCESS,
  props<{boards: BoardInterface[]}>()
)
