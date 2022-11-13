import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/auth/store/actionTypes'
import {AuthRequestInterface} from 'src/app/auth/types/authRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: AuthRequestInterface}>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{backendErrorMessage: string}>()
)
