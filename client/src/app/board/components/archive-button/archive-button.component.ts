import {Component} from '@angular/core'
import {Store} from '@ngrx/store'
import {ActivatedRoute} from '@angular/router'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {openArchiveAction} from 'src/app/board/store/actions/openArchive.action'

@Component({
  selector: 'app-archive-button',
  templateUrl: './archive-button.component.html',
  styleUrls: ['./archive-button.component.scss']
})
export class ArchiveButtonComponent {
  constructor(
    private store: Store<AppStateInterface>,
    private route: ActivatedRoute
  ) {}

  onOpenArchive(): void {
    const boardId = this.route.snapshot.params['id']
    this.store.dispatch(openArchiveAction({boardId}))
  }
}
