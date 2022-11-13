import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {select, Store} from '@ngrx/store'
import {map, Observable} from 'rxjs'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {ListInterface} from 'src/app/shared/types/list.interface'
import {
  boardBackendErrorMessageSelector,
  boardNameSelector,
  currentListSelector,
  currentTaskSelector,
  isEditModeSelector,
  isTaskModalOpenedSelector,
  listsSelector,
  tasksSelector
} from 'src/app/board/store/selectors'
import {getListsAction} from 'src/app/board/store/actions/getLists.action'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {getTasksAction} from 'src/app/board/store/actions/getTasks.action'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  public lists$: Observable<ListInterface[]>
  public tasks$: Observable<TaskInterface[]>
  public currentList$: Observable<ListInterface>
  public currentTask$: Observable<TaskInterface>
  public boardName$: Observable<string>
  public isTaskModalOpened$: Observable<boolean>
  public isEditMode$: Observable<boolean>
  public backendErrorMessage$: Observable<string | null>

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const boardId = this.route.snapshot.params['id']
    this.store.dispatch(getListsAction({boardId}))
    this.store.dispatch(getTasksAction({boardId}))
    this.initializeValues()
  }

  initializeValues(): void {
    this.lists$ = this.store.pipe(select(listsSelector))
    this.tasks$ = this.store.pipe(select(tasksSelector))
    this.currentList$ = this.store.pipe(select(currentListSelector))
    this.currentTask$ = this.store.pipe(select(currentTaskSelector))
    this.boardName$ = this.store.pipe(select(boardNameSelector))
    this.isTaskModalOpened$ = this.store.pipe(select(isTaskModalOpenedSelector))
    this.isEditMode$ = this.store.pipe(select(isEditModeSelector))
    this.backendErrorMessage$ = this.store.pipe(
      select(boardBackendErrorMessageSelector)
    )
  }

  getTasks(listId: string): Observable<TaskInterface[]> {
    return this.tasks$.pipe(
      map((tasks: TaskInterface[]) =>
        tasks.filter((task) => task.listId === listId)
      )
    )
  }
}
