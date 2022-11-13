import {ListInterface} from 'src/app/shared/types/list.interface'
import {TaskInterface} from 'src/app/shared/types/task.interface'

export interface BoardStateInterface {
  lists: ListInterface[]
  tasks: TaskInterface[]
  archivedTasks: TaskInterface[]
  currentList: ListInterface | null
  currentTask: TaskInterface | null
  draggedTaskId: string | null
  dragOver: string
  boardName: string
  isTaskModalOpened: boolean
  isEditMode: boolean
  backendErrorMessage: string | null
}
