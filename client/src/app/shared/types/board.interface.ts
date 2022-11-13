import {ListInterface} from 'src/app/shared/types/list.interface'

export interface BoardInterface {
  _id: string
  name: string
  description: string
  createdAt: string
  lists: ListInterface[]
}
