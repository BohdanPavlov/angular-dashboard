import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const closeArchiveAction = createAction(
  ActionTypes.CLOSE_ARCHIVE,
  props<{boardId: string}>()
)
