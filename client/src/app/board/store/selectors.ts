import {createSelector} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {BoardStateInterface} from 'src/app/board/types/boardState.interface'

export const boardFeatureSelector = (
  state: AppStateInterface
): BoardStateInterface => state.board

export const listsSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.lists
)

export const tasksSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.tasks
)

export const boardNameSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.boardName
)

export const currentListSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.currentList
)

export const currentTaskSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.currentTask
)

export const isTaskModalOpenedSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.isTaskModalOpened
)

export const isEditModeSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.isEditMode
)

export const draggedTaskIdSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.draggedTaskId
)

export const dragOverSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.dragOver
)

export const archivedTasksSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.archivedTasks
)

export const boardBackendErrorMessageSelector = createSelector(
  boardFeatureSelector,
  (boardState: BoardStateInterface) => boardState.backendErrorMessage
)
