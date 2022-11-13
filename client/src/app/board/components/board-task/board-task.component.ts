import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core'
import {Store} from '@ngrx/store'
import {fromEvent, switchMap, takeUntil, tap} from 'rxjs'

import {TaskInterface} from 'src/app/shared/types/task.interface'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {openEditTaskModalAction} from 'src/app/board/store/actions/taskModal.action'
import {
  deleteTaskAction,
  deleteTaskFromArchiveAction
} from 'src/app/board/store/actions/deleteTask.action'
import {setDraggedTaskIdAction} from 'src/app/board/store/actions/setDraggedTaskId.action'
import {
  clearDragOverAction,
  dragResultAction
} from 'src/app/board/store/actions/dragResult.action'

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardTaskComponent implements AfterViewInit {
  @ViewChild('draggable') draggableChild: ElementRef<HTMLElement>

  get $draggable() {
    return this.draggableChild.nativeElement
  }

  @Input() task: TaskInterface

  constructor(private store: Store<AppStateInterface>) {}

  ngAfterViewInit(): void {
    const mouseDown$ = fromEvent<MouseEvent>(this.$draggable, 'mousedown').pipe(
      tap(() =>
        this.store.dispatch(setDraggedTaskIdAction({taskId: this.task._id}))
      )
    )

    const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup').pipe(
      tap(() => {
        this.store.dispatch(dragResultAction())
        this.store.dispatch(clearDragOverAction())

        this.$draggable.classList.remove('dragged')
        this.$draggable.style.removeProperty('left')
        this.$draggable.style.removeProperty('top')
      })
    )

    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove')

    mouseDown$
      .pipe(
        switchMap((start) =>
          mouseMove$.pipe(
            tap((event) => {
              this.$draggable.classList.add('dragged')
              this.$draggable.style.left = event.pageX - start.offsetX + 'px'
              this.$draggable.style.top = event.pageY - start.offsetY + 'px'
            }),
            takeUntil(mouseUp$)
          )
        )
      )
      .subscribe()
  }

  onOpenEditTaskModal(): void {
    this.store.dispatch(openEditTaskModalAction({currentTask: this.task}))
  }

  onDeleteTask(): void {
    this.store.dispatch(deleteTaskAction({taskId: this.task._id}))
  }

  onDeleteTaskFromArchive() {
    this.store.dispatch(deleteTaskFromArchiveAction({taskId: this.task._id}))
  }
}
