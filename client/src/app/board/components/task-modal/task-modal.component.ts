import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute} from '@angular/router'
import {Store} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {closeTaskModalAction} from 'src/app/board/store/actions/taskModal.action'
import {AddTaskRequestInterface} from 'src/app/board/types/addTaskRequest.interface'
import {addTaskAction} from 'src/app/board/store/actions/addTask.action'
import {ListInterface} from 'src/app/shared/types/list.interface'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {editTaskAction} from 'src/app/board/store/actions/editTask.action'
import {archiveTaskAction} from 'src/app/board/store/actions/archiveTask.action'

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalComponent implements OnInit {
  @Input() currentList: ListInterface | null
  @Input() currentTask: TaskInterface | null
  @Input() isEditMode: boolean

  public taskModalForm: FormGroup

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.taskModalForm = this.fb.group({
      name: [
        this.currentTask?.name ? this.currentTask?.name : '',
        [Validators.required, Validators.maxLength(15)]
      ]
    })
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.editTask()
    } else {
      this.addTask()
    }

    this.onModalClose()
  }

  addTask(): void {
    const request: AddTaskRequestInterface = {
      boardId: this.route.snapshot.params['id'],
      listId: this.currentList?._id,
      name: this.taskModalForm.value.name
    }

    this.store.dispatch(addTaskAction({request}))
  }

  editTask(): void {
    this.store.dispatch(
      editTaskAction({
        taskId: this.currentTask?._id,
        newName: this.taskModalForm.value.name
      })
    )
  }

  onArchiveTask(): void {
    this.store.dispatch(archiveTaskAction({taskId: this.currentTask._id}))
    this.onModalClose()
  }

  onModalClose(): void {
    this.store.dispatch(closeTaskModalAction())
  }
}
