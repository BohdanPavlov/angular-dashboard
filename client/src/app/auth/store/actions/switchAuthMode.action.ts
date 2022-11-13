import {createAction} from '@ngrx/store'

import {ActionTypes} from 'src/app/auth/store/actionTypes'

export const switchAuthModeAction = createAction(ActionTypes.SWITCH_MODE)
