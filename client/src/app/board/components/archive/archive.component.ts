import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {TaskInterface} from 'src/app/shared/types/task.interface'
import {archivedTasksSelector} from 'src/app/board/store/selectors'
import {closeArchiveAction} from 'src/app/board/store/actions/closeArchive.action'

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  public archivedTasks$: Observable<TaskInterface[]>

  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.archivedTasks$ = this.store.pipe(select(archivedTasksSelector))
  }

  onCloseArchive(): void {
    const boardId = this.route.snapshot.parent.params['id']
    this.store.dispatch(closeArchiveAction({boardId}))
  }
}
