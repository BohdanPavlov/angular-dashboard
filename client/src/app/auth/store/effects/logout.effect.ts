import {Actions, createEffect, ofType} from '@ngrx/effects'
import {tap} from 'rxjs'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

import {logoutAction} from 'src/app/auth/store/actions/logout.action'

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          localStorage.removeItem('accessToken')
          this.router.navigate(['/auth'])
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions, private router: Router) {}
}
