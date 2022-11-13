import {Injectable} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import {Observable} from 'rxjs'

import {PersistenceService} from 'src/app/shared/services/persistence.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private persistenceService: PersistenceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.persistenceService.get('accessToken')
    let isAuth = !!token

    if (state.url === '/auth') {
      if (isAuth) {
        return this.router.createUrlTree(['/dashboard'])
      }
      return true
    }
    if (isAuth) return true
    return this.router.createUrlTree(['/auth'])
  }
}
