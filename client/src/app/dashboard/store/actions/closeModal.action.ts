import {createAction} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'

export const closeModalAction = createAction(ActionTypes.CLOSE_MODAL)
