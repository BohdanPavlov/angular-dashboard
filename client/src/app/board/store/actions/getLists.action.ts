import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'
import {GetListsResponseInterface} from 'src/app/board/types/getListsResponse.interface'

export const getListsAction = createAction(
  ActionTypes.GET_LISTS,
  props<{boardId: string}>()
)

export const getListsSuccessAction = createAction(
  ActionTypes.GET_LISTS_SUCCESS,
  props<{response: GetListsResponseInterface}>()
)

export const getListsFailureAction = createAction(
  ActionTypes.GET_LISTS_FAILURE,
  props<{backendErrorMessage: string}>()
)
