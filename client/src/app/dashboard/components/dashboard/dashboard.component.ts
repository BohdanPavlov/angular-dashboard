import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {BoardInterface} from 'src/app/shared/types/board.interface'
import {boardsSelector} from 'src/app/dashboard/store/selectors'
import {getBoardsAction} from 'src/app/dashboard/store/actions/getBoards.action'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public boards$: Observable<BoardInterface[]>

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(getBoardsAction())
    this.initializeValues()
  }

  initializeValues(): void {
    this.boards$ = this.store.pipe(select(boardsSelector))
  }
}
