import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  isLoading: boolean
  currentUser: CurrentUserInterface | null
  isLoggedIn: boolean | null
  backendErrorMessage: string | null
  isLoginMode: boolean
}
