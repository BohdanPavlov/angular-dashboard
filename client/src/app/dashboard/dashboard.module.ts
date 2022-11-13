import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {StoreModule} from '@ngrx/store'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'

import {AuthGuard} from 'src/app/shared/guards/auth.guard'
import {ToolbarModule} from 'src/app/shared/modules/toolbar/toolbar.module'
import {reducer} from 'src/app/dashboard/store/reducers'
import {DashboardComponent} from 'src/app/dashboard/components/dashboard/dashboard.component'
import {BoardModalComponent} from 'src/app/dashboard/components/board-modal/board-modal.component'
import {BoardCardComponent} from 'src/app/dashboard/components/board-card/board-card.component'
import {AddBoardComponent} from 'src/app/dashboard/components/add-board/add-board.component'
import {OpenModalEffect} from 'src/app/dashboard/store/effects/openModal.effect'
import {CloseModalEffect} from 'src/app/dashboard/store/effects/closeModal.effect'
import {GetBoardsEffect} from 'src/app/dashboard/store/effects/getBoards.effect'
import {DashboardService} from 'src/app/dashboard/services/dashboard.service'
import {CreateBoardEffect} from 'src/app/dashboard/store/effects/createBoard.effect'
import {EditBoardEffect} from 'src/app/dashboard/store/effects/editBoard.effect'
import {DeleteBoardEffect} from 'src/app/dashboard/store/effects/deleteBoard.effect'
import {OpenBoardPageEffect} from 'src/app/dashboard/store/effects/openBoardPage.effect'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'add-board',
        component: BoardModalComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    BoardCardComponent,
    AddBoardComponent,
    BoardModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    ReactiveFormsModule,
    StoreModule.forFeature('dashboard', reducer),
    EffectsModule.forFeature([
      GetBoardsEffect,
      CreateBoardEffect,
      OpenModalEffect,
      CloseModalEffect,
      EditBoardEffect,
      DeleteBoardEffect,
      OpenBoardPageEffect
    ])
  ],
  providers: [DashboardService]
})
export class DashboardModule {}
