import {Action, createReducer, on} from '@ngrx/store'

import {BoardStateInterface} from 'src/app/board/types/boardState.interface'
import {
  getListsFailureAction,
  getListsSuccessAction
} from 'src/app/board/store/actions/getLists.action'
import {
  closeTaskModalAction,
  openAddTaskModalAction,
  openEditTaskModalAction
} from 'src/app/board/store/actions/taskModal.action'
import {
  getTasksFailureAction,
  getTasksSuccessAction
} from 'src/app/board/store/actions/getTasks.action'
import {
  addTaskFailureAction,
  addTaskSuccessAction
} from 'src/app/board/store/actions/addTask.action'
import {
  editTaskFailureAction,
  editTaskSuccessAction
} from 'src/app/board/store/actions/editTask.action'
import {
  deleteTaskFailureAction,
  deleteTaskFromArchiveFailureAction,
  deleteTaskFromArchiveSuccessAction,
  deleteTaskSuccessAction
} from 'src/app/board/store/actions/deleteTask.action'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {filterTasksAction} from 'src/app/board/store/actions/filterTasks.action'
import {sortTasksAction} from 'src/app/board/store/actions/sortTasks.action'
import {setDraggedTaskIdAction} from 'src/app/board/store/actions/setDraggedTaskId.action'
import {
  clearDragOverAction,
  dragResultAction
} from 'src/app/board/store/actions/dragResult.action'
import {changeTaskListSuccessAction} from 'src/app/board/store/actions/changeTaskList.action'
import {
  archiveTaskFailureAction,
  archiveTaskSuccessAction
} from 'src/app/board/store/actions/archiveTask.action'

const initialState: BoardStateInterface = {
  lists: [],
  tasks: [],
  archivedTasks: [],
  currentList: null,
  currentTask: null,
  draggedTaskId: null,
  dragOver: '',
  boardName: '',
  isTaskModalOpened: false,
  isEditMode: false,
  backendErrorMessage: null
}

const boardReducer = createReducer(
  initialState,
  on(
    getListsSuccessAction,
    (state, action): BoardStateInterface => ({
      ...state,
      lists: action.response.lists,
      boardName: action.response.boardName
    })
  ),
  on(
    getTasksSuccessAction,
    (state, action): BoardStateInterface => ({
      ...state,
      tasks: action.tasks.filter((task: TaskInterface) => task.listId !== null),
      archivedTasks: action.tasks.filter(
        (task: TaskInterface) => task.listId === null
      )
    })
  ),
  on(addTaskSuccessAction, (state, action): BoardStateInterface => {
    const updatedTasks = [...state.tasks, action.newTask]

    return {
      ...state,
      tasks: updatedTasks
    }
  }),
  on(editTaskSuccessAction, (state, action): BoardStateInterface => {
    const taskIndex = state.tasks.findIndex(
      (task) => task._id === action.taskId
    )
    const updatedTask = {...state.tasks[taskIndex], name: action.newName}

    const updatedTasks = [...state.tasks]
    updatedTasks[taskIndex] = updatedTask

    return {
      ...state,
      tasks: updatedTasks
    }
  }),
  on(deleteTaskSuccessAction, (state, action): BoardStateInterface => {
    const updatedTasks = state.tasks.filter(
      (task: TaskInterface) => task._id !== action.taskId
    )

    return {
      ...state,
      tasks: updatedTasks
    }
  }),
  on(filterTasksAction, (state, action): BoardStateInterface => {
    const filteredTasks = state.tasks.filter((task: TaskInterface) =>
      task.name.toLowerCase().includes(action.filter)
    )

    return {
      ...state,
      tasks: filteredTasks
    }
  }),
  on(sortTasksAction, (state, action): BoardStateInterface => {
    const sortedTasks = [...state.tasks]

    sortedTasks.sort((prev: TaskInterface, next: TaskInterface) => {
      const A = prev[`${action.sortParam}`].toLowerCase()
      const B = next[`${action.sortParam}`].toLowerCase()

      if (action.sortMode === 'ASC' ? A < B : A > B) return -1
      if (action.sortMode === 'ASC' ? A > B : A < B) return 1

      return 0
    })

    return {
      ...state,
      tasks: sortedTasks
    }
  }),
  on(
    openAddTaskModalAction,
    (state, action): BoardStateInterface => ({
      ...state,
      isTaskModalOpened: true,
      currentList: action.currentList
    })
  ),
  on(
    openEditTaskModalAction,
    (state, action): BoardStateInterface => ({
      ...state,
      isTaskModalOpened: true,
      isEditMode: true,
      currentTask: action.currentTask
    })
  ),
  on(
    closeTaskModalAction,
    (state): BoardStateInterface => ({
      ...state,
      isTaskModalOpened: false,
      isEditMode: false,
      currentList: null,
      currentTask: null
    })
  ),
  on(
    setDraggedTaskIdAction,
    (state, action): BoardStateInterface => ({
      ...state,
      draggedTaskId: action.taskId
    })
  ),
  on(changeTaskListSuccessAction, (state, action): BoardStateInterface => {
    const taskToChange = state.tasks.find(
      (task: TaskInterface) => task._id === action.taskId
    )

    if (taskToChange.listId === action.listId) {
      return {
        ...state
      }
    }

    const updatedTasks = state.tasks.map((task: TaskInterface) =>
      task._id === action.taskId ? {...task, listId: action.listId} : {...task}
    )

    return {
      ...state,
      tasks: updatedTasks
    }
  }),
  on(
    dragResultAction,
    (state): BoardStateInterface => ({
      ...state,
      dragOver: state.draggedTaskId,
      draggedTaskId: ''
    })
  ),
  on(
    clearDragOverAction,
    (state): BoardStateInterface => ({
      ...state,
      dragOver: ''
    })
  ),
  on(archiveTaskSuccessAction, (state, action): BoardStateInterface => {
    const tasksCopy = [...state.tasks]
    const archivedTask = tasksCopy.find(
      (task: TaskInterface) => task._id === action.taskId
    )
    const updatedArchivedTask = {...archivedTask, listId: null}
    const updatedArchivedTasks = [...state.archivedTasks, updatedArchivedTask]
    const filteredTasks = tasksCopy.filter(
      (task: TaskInterface) => task._id !== action.taskId
    )

    return {
      ...state,
      tasks: filteredTasks,
      archivedTasks: updatedArchivedTasks
    }
  }),
  on(
    deleteTaskFromArchiveSuccessAction,
    (state, action): BoardStateInterface => {
      const updatedArchivedTasks = state.archivedTasks.filter(
        (task: TaskInterface) => task._id !== action.taskId
      )

      return {
        ...state,
        archivedTasks: updatedArchivedTasks
      }
    }
  ),
  on(
    getListsFailureAction,
    getTasksFailureAction,
    addTaskFailureAction,
    editTaskFailureAction,
    deleteTaskFailureAction,
    deleteTaskFromArchiveFailureAction,
    archiveTaskFailureAction,
    (state, action): BoardStateInterface => ({
      ...state,
      backendErrorMessage: action.backendErrorMessage
    })
  )
)

export function reducer(state: BoardStateInterface, action: Action) {
  return boardReducer(state, action)
}
