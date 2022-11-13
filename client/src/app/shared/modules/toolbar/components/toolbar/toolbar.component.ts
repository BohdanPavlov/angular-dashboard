import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit
} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {sortModeSelector} from 'src/app/shared/modules/toolbar/store/selectors'
import {changeSortModeAction} from 'src/app/shared/modules/toolbar/store/actions/changeSortMode.action'
import {filterBoardsAction} from 'src/app/dashboard/store/actions/filterBoards.action'
import {getBoardsAction} from 'src/app/dashboard/store/actions/getBoards.action'
import {filterTasksAction} from 'src/app/board/store/actions/filterTasks.action'
import {getTasksAction} from 'src/app/board/store/actions/getTasks.action'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  @Input() boardName: string
  public sortMode$: Observable<string>
  public filterInput: string

  @HostListener('document:click', ['$event'])
  onClick() {
    this.store.dispatch(changeSortModeAction({sortMode: ''}))
  }

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sortMode$ = this.store.pipe(select(sortModeSelector))
  }

  onToggleDropdown(event): void {
    event.stopPropagation()

    const sortMode = event.target.innerText
    this.store.dispatch(changeSortModeAction({sortMode}))
  }

  onFilter(): void {
    if (this.boardName) {
      if (this.filterInput) {
        this.store.dispatch(
          filterTasksAction({filter: this.filterInput.toLowerCase()})
        )
      } else {
        const boardId = this.route.snapshot.params['id']
        this.store.dispatch(getTasksAction({boardId}))
      }
    } else {
      if (this.filterInput) {
        this.store.dispatch(
          filterBoardsAction({filter: this.filterInput.toLowerCase()})
        )
      } else {
        this.store.dispatch(getBoardsAction())
      }
    }
  }
}
