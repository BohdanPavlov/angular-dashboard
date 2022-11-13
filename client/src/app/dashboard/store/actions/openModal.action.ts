import {createAction} from '@ngrx/store'

import {ActionTypes} from 'src/app/dashboard/store/actionTypes'

export const openModalAction = createAction(ActionTypes.OPEN_MODAL)
