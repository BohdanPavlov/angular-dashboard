import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {currentUserSelector} from 'src/app/auth/store/selectors'
import {logoutAction} from 'src/app/auth/store/actions/logout.action'

@Component({
  selector: 'app-top-bar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent implements OnInit {
  public currentUser$: Observable<CurrentUserInterface | null>

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  onLogout(): void {
    this.store.dispatch(logoutAction())
  }
}
