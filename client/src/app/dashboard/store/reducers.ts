import {Action, createReducer, on} from '@ngrx/store'

import {DashboardStateInterface} from 'src/app/dashboard/types/dashboardState.interface'
import {getBoardsSuccessAction} from 'src/app/dashboard/store/actions/getBoards.action'
import {createBoardSuccessAction} from 'src/app/dashboard/store/actions/createBoard.action'
import {editBoardSuccessAction} from 'src/app/dashboard/store/actions/editBoard.action'
import {BoardInterface} from 'src/app/shared/types/board.interface'
import {deleteBoardSuccessAction} from 'src/app/dashboard/store/actions/deleteBoard.action'
import {selectBoardAction} from 'src/app/dashboard/store/actions/selectBoard.action'
import {sortBoardsAction} from 'src/app/dashboard/store/actions/sortBoards.action'
import {filterBoardsAction} from 'src/app/dashboard/store/actions/filterBoards.action'
import {closeModalAction} from 'src/app/dashboard/store/actions/closeModal.action'

const initialState: DashboardStateInterface = {
  boards: null,
  currentBoard: null
}

const dashboardReducer = createReducer(
  initialState,
  on(
    getBoardsSuccessAction,
    (state, action): DashboardStateInterface => ({
      ...state,
      boards: action.boards
    })
  ),
  on(createBoardSuccessAction, (state, action): DashboardStateInterface => {
    const newBoards = [...state.boards]
    newBoards.push(action.board)

    return {
      ...state,
      boards: newBoards
    }
  }),
  on(
    selectBoardAction,
    (state, action): DashboardStateInterface => ({
      ...state,
      currentBoard: action.currentBoard
    })
  ),
  on(
    closeModalAction,
    (state): DashboardStateInterface => ({
      ...state,
      currentBoard: null
    })
  ),
  on(editBoardSuccessAction, (state, action): DashboardStateInterface => {
    const updatedBoards = [...state.boards]
    const boardIndex = updatedBoards.findIndex(
      (board: BoardInterface) => board._id === action.updatedBoard._id
    )
    updatedBoards[boardIndex] = action.updatedBoard

    return {
      ...state,
      boards: updatedBoards
    }
  }),
  on(sortBoardsAction, (state, action): DashboardStateInterface => {
    const newBoards = [...state.boards]

    if (action.sortParam === 'amountOfTasks') {
      newBoards.sort((a: BoardInterface, b: BoardInterface) => {
        const A =
          a.lists[0].tasks.length +
          a.lists[1].tasks.length +
          a.lists[2].tasks.length
        const B =
          b.lists[0].tasks.length +
          b.lists[1].tasks.length +
          b.lists[2].tasks.length

        if (action.sortMode === 'ASC' ? A < B : A > B) return -1
        if (action.sortMode === 'ASC' ? A > B : A < B) return 1

        return 0
      })
    } else {
      newBoards.sort((a: BoardInterface, b: BoardInterface) => {
        const A = a[`${action.sortParam}`].toLowerCase()
        const B = b[`${action.sortParam}`].toLowerCase()

        if (action.sortMode === 'ASC' ? A < B : A > B) return -1
        if (action.sortMode === 'ASC' ? A > B : A < B) return 1

        return 0
      })
    }

    return {
      ...state,
      boards: newBoards
    }
  }),
  on(filterBoardsAction, (state, action): DashboardStateInterface => {
    const filteredBoards = state.boards.filter((board: BoardInterface) =>
      board.name.toLowerCase().includes(action.filter)
    )

    return {
      ...state,
      boards: filteredBoards
    }
  }),
  on(deleteBoardSuccessAction, (state, action): DashboardStateInterface => {
    const updatedBoards = [...state.boards].filter(
      (board: BoardInterface) => board._id !== action.currentBoard._id
    )

    return {
      ...state,
      boards: updatedBoards
    }
  })
)

export function reducer(state: DashboardStateInterface, action: Action) {
  return dashboardReducer(state, action)
}
