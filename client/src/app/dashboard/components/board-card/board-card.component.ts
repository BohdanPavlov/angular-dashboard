import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {Store} from '@ngrx/store'

import {BoardInterface} from 'src/app/shared/types/board.interface'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {openModalAction} from 'src/app/dashboard/store/actions/openModal.action'
import {selectBoardAction} from 'src/app/dashboard/store/actions/selectBoard.action'
import {deleteBoardAction} from 'src/app/dashboard/store/actions/deleteBoard.action'
import {openBoardPageAction} from 'src/app/dashboard/store/actions/openBoardPage.action'

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardCardComponent {
  @Input() board: BoardInterface

  constructor(private store: Store<AppStateInterface>) {}

  onEditBoard(event: MouseEvent): void {
    event.stopPropagation()

    this.store.dispatch(selectBoardAction({currentBoard: this.board}))
    this.store.dispatch(openModalAction())
  }

  onDeleteBoard(event: MouseEvent): void {
    event.stopPropagation()

    if (this.confirmDeleteBoard()) {
      this.store.dispatch(deleteBoardAction({currentBoard: this.board}))
    } else {
      return null
    }
  }

  confirmDeleteBoard(): boolean {
    return confirm('Do you really want to delete this board?')
  }

  onBoardSelected(): void {
    this.store.dispatch(openBoardPageAction({currentBoard: this.board}))
  }
}
