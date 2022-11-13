import {AuthStateInterface} from 'src/app/auth/types/authState.interface'
import {DashboardStateInterface} from 'src/app/dashboard/types/dashboardState.interface'
import {BoardStateInterface} from 'src/app/board/types/boardState.interface'
import {ToolbarStateInterface} from 'src/app/shared/modules/toolbar/types/toolbarState.interface'

export interface AppStateInterface {
  auth: AuthStateInterface
  toolbar: ToolbarStateInterface
  dashboard: DashboardStateInterface
  board: BoardStateInterface
}
