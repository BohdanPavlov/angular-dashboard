import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {isLoggedInSelector} from 'src/app/auth/store/selectors'
import {getCurrentUserAction} from 'src/app/auth/store/actions/getCurrentUser.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn$: Observable<boolean>

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
  }
}
