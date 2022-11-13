import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/auth/store/actionTypes'
import {AuthRequestInterface} from 'src/app/auth/types/authRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: AuthRequestInterface}>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{backendErrorMessage: string}>()
)
