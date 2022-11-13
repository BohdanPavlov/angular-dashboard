import {ChangeDetectionStrategy, Component} from '@angular/core'
import {Store} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {openModalAction} from 'src/app/dashboard/store/actions/openModal.action'

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBoardComponent {
  constructor(private store: Store<AppStateInterface>) {}

  onModalOpen(): void {
    this.store.dispatch(openModalAction())
  }
}
