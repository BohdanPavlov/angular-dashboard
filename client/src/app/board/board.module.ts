import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {EffectsModule} from '@ngrx/effects'
import {RouterModule, Routes} from '@angular/router'
import {StoreModule} from '@ngrx/store'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {AuthGuard} from 'src/app/shared/guards/auth.guard'
import {reducer} from 'src/app/board/store/reducers'
import {BoardComponent} from 'src/app/board/components/board/board.component'
import {ToolbarModule} from 'src/app/shared/modules/toolbar/toolbar.module'
import {BoardListComponent} from './components/board-list/board-list.component'
import {BoardService} from 'src/app/board/services/board.service'
import {GetListsEffect} from 'src/app/board/store/effects/getLists.effect'
import {AddTaskEffect} from 'src/app/board/store/effects/addTask.effect'
import {BoardTaskComponent} from './components/board-task/board-task.component'
import {TaskModalComponent} from './components/task-modal/task-modal.component'
import {GetTasksEffect} from 'src/app/board/store/effects/getTasks.effect'
import {EditTaskEffect} from 'src/app/board/store/effects/editTask.effect'
import {DeleteTaskEffect} from 'src/app/board/store/effects/deleteTask.effect'
import {ChangeTaskListEffect} from 'src/app/board/store/effects/changeTaskList.effect'
import {ArchiveTaskEffect} from 'src/app/board/store/effects/archiveTask.effect'
import {OpenArchiveEffect} from 'src/app/board/store/effects/openArchive.effect'
import {ArchiveButtonComponent} from './components/archive-button/archive-button.component'
import {ArchiveComponent} from 'src/app/board/components/archive/archive.component'
import {CloseArchiveEffect} from 'src/app/board/store/effects/closeArchive.effect'
import {BackendErrorMessageModule} from 'src/app/shared/modules/backendErrorMessage/backend-error-message.module'

const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'archive',
        component: ArchiveComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    BoardComponent,
    BoardListComponent,
    BoardTaskComponent,
    TaskModalComponent,
    ArchiveComponent,
    ArchiveButtonComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('board', reducer),
    EffectsModule.forFeature([
      GetListsEffect,
      GetTasksEffect,
      AddTaskEffect,
      EditTaskEffect,
      DeleteTaskEffect,
      ChangeTaskListEffect,
      ArchiveTaskEffect,
      OpenArchiveEffect,
      CloseArchiveEffect
    ]),
    BackendErrorMessageModule,
    FormsModule
  ],
  providers: [BoardService]
})
export class BoardModule {}
