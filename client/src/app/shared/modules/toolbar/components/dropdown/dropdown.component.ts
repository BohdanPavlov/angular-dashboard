import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {sortBoardsAction} from 'src/app/dashboard/store/actions/sortBoards.action'
import {sortTasksAction} from 'src/app/board/store/actions/sortTasks.action'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  @Input() boardName: string
  @Input() sortMode: string

  constructor(private store: Store<AppStateInterface>) {}

  onSort(sortParam: string): void {
    if (this.boardName) {
      this.store.dispatch(sortTasksAction({sortMode: this.sortMode, sortParam}))
    } else {
      this.store.dispatch(
        sortBoardsAction({sortMode: this.sortMode, sortParam})
      )
    }
  }
}
