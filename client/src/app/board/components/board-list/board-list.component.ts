import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {fromEvent, Observable, Subscription, tap} from 'rxjs'

import {ListInterface} from 'src/app/shared/types/list.interface'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {openAddTaskModalAction} from 'src/app/board/store/actions/taskModal.action'
import {
  draggedTaskIdSelector,
  dragOverSelector
} from 'src/app/board/store/selectors'
import {changeTaskListAction} from 'src/app/board/store/actions/changeTaskList.action'

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListComponent implements OnInit, AfterViewInit {
  @ViewChild('$list') listChild: ElementRef<HTMLElement>

  get $list() {
    return this.listChild.nativeElement
  }

  @Input() list: ListInterface
  @Input() tasks$: Observable<TaskInterface[]>

  public draggedTaskId$: Observable<string>
  private draggedTaskIdSub$: Subscription
  public draggedTaskId: string
  public backgroundColor: string

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.draggedTaskId$ = this.store.select(draggedTaskIdSelector)
    this.draggedTaskIdSub$ = this.draggedTaskId$.subscribe(
      (draggedTaskId: string) => {
        this.draggedTaskId = draggedTaskId
      }
    )
  }

  ngAfterViewInit(): void {
    const dragOverList$ = this.store.pipe(select(dragOverSelector))

    let subscription = dragOverList$.subscribe((taskId) => {
      this.confirmDrag(this.list._id, taskId)
    })

    subscription.unsubscribe()

    const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        tap((event) => {
          const listRect = this.$list.getBoundingClientRect()

          if (
            event.pageX > listRect.left &&
            event.pageX < listRect.right &&
            event.pageY > listRect.top &&
            event.pageY < listRect.bottom &&
            this.draggedTaskId
          ) {
            if (subscription.closed) {
              subscription = dragOverList$.subscribe((taskId) => {
                this.confirmDrag(this.list._id, taskId)
              })
            }
            return
          }

          subscription.unsubscribe()
        })
      )
      .subscribe()
  }

  confirmDrag(listId: string, taskId: string): void {
    if (taskId) {
      this.store.dispatch(changeTaskListAction({listId, taskId}))
    }
  }

  onOpenAddTaskModal(): void {
    this.store.dispatch(openAddTaskModalAction({currentList: this.list}))
  }

  ngOnDestroy(): void {
    this.draggedTaskIdSub$.unsubscribe()
  }
}
