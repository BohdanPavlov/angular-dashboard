import {Action, createReducer, on} from '@ngrx/store'

import {AuthStateInterface} from 'src/app/auth/types/authState.interface'
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction
} from 'src/app/auth/store/actions/register.action'
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction
} from 'src/app/auth/store/actions/login.action'
import {switchAuthModeAction} from 'src/app/auth/store/actions/switchAuthMode.action'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from 'src/app/auth/store/actions/getCurrentUser.action'
import {logoutAction} from 'src/app/auth/store/actions/logout.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  backendErrorMessage: null,
  isLoginMode: false
}

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      backendErrorMessage: null
    })
  ),
  on(
    registerSuccessAction,
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      backendErrorMessage: action.backendErrorMessage
    })
  ),
  on(
    switchAuthModeAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoginMode: !state.isLoginMode
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
  ),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      ...initialState
    })
  )
)

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
