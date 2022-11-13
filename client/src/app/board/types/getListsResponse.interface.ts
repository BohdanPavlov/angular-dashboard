import {ListInterface} from 'src/app/shared/types/list.interface'

export interface GetListsResponseInterface {
  lists: ListInterface[]
  boardName: string
}
