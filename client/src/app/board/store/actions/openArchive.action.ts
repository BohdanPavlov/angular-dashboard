import {createAction, props} from '@ngrx/store'

import {ActionTypes} from 'src/app/board/store/actionTypes'

export const openArchiveAction = createAction(
  ActionTypes.OPEN_ARCHIVE,
  props<{boardId: string}>()
)
