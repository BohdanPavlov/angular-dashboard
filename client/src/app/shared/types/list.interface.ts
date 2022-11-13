import {TaskInterface} from 'src/app/shared/types/task.interface'

export interface ListInterface {
  _id: string
  name: string
  tasks: TaskInterface[]
}
