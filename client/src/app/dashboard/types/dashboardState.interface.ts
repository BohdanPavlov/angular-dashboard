import {BoardInterface} from 'src/app/shared/types/board.interface'

export interface DashboardStateInterface {
  boards: BoardInterface[] | null
  currentBoard: BoardInterface | null
}
