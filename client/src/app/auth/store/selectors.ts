import {createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {AuthStateInterface} from 'src/app/auth/types/authState.interface'

export const authFeatureSelector = (
  state: AppStateInterface
): AuthStateInterface => state.auth

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const backendErrorMessageSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.backendErrorMessage
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
)

export const isLoginModeSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoginMode
)
