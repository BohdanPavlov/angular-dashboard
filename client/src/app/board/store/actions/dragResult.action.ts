import {createAction} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const dragResultAction = createAction(ActionTypes.DRAG_RESULT)
export const clearDragOverAction = createAction(ActionTypes.CLEAR_DRAG_OVER)
