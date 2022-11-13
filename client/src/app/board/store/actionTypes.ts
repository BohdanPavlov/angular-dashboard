export enum ActionTypes {
  GET_LISTS = '[Board] Get lists',
  GET_LISTS_SUCCESS = '[Board] Get lists success',
  GET_LISTS_FAILURE = '[Board] Get lists failure',

  GET_TASKS = '[Board] Get tasks',
  GET_TASKS_SUCCESS = '[Board] Get tasks success',
  GET_TASKS_FAILURE = '[Board] Get tasks failure',

  ADD_TASK = '[Board] Add task',
  ADD_TASK_SUCCESS = '[Board] Add task success',
  ADD_TASK_FAILURE = '[Board] Add task failure',

  EDIT_TASK = '[Board] Edit task',
  EDIT_TASK_SUCCESS = '[Board] Edit task success',
  EDIT_TASK_FAILURE = '[Board] Edit task failure',

  DELETE_TASK = '[Board] Delete task',
  DELETE_TASK_SUCCESS = '[Board] Delete task success',
  DELETE_TASK_FAILURE = '[Board] Delete task failure',

  FILTER_TASKS = '[Board] Filter tasks',
  SORT_TASKS = '[Board] Sort tasks',

  ARCHIVE_TASK = '[Board] Archive task',
  ARCHIVE_TASK_SUCCESS = '[Board] Archive task success',
  ARCHIVE_TASK_FAILURE = '[Board] Archive task failure',

  OPEN_ARCHIVE = '[Board] Open archive',
  CLOSE_ARCHIVE = '[Board] Close archive',

  DELETE_TASK_FROM_ARCHIVE = '[Board] Delete task from archive',
  DELETE_TASK_FROM_ARCHIVE_SUCCESS = '[Board] Delete task from archive success',
  DELETE_TASK_FROM_ARCHIVE_FAILURE = '[Board] Delete task from archive failure',

  SET_DRAGGED_TASK_ID = '[Board] Set dragged task id',
  DRAG_RESULT = '[Board] Drag result',
  CLEAR_DRAG_OVER = '[Board] Clear drag over',

  CHANGE_TASK_LIST = '[Board] Change task list',
  CHANGE_TASK_LIST_SUCCESS = '[Board] Change task list success',

  OPEN_ADD_TASK_MODAL = '[Board] Open add task modal',
  OPEN_EDIT_TASK_MODAL = '[Board] Open edit task modal',
  CLOSE_TASK_MODAL = '[Board] Close task modal'
}
