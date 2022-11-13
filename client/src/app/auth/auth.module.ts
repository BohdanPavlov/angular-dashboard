import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule, Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {AuthComponent} from 'src/app/auth/components/auth/auth.component'
import {reducer} from 'src/app/auth/store/reducers'
import {AuthService} from 'src/app/auth/services/auth.service'
import {RegisterEffect} from 'src/app/auth/store/effects/register.effect'
import {BackendErrorMessageModule} from 'src/app/shared/modules/backendErrorMessage/backend-error-message.module'
import {PersistenceService} from 'src/app/shared/services/persistence.service'
import {LoginEffect} from 'src/app/auth/store/effects/login.effect'
import {GetCurrentUserEffect} from 'src/app/auth/store/effects/getCurrentUser.effect'
import {AuthGuard} from 'src/app/shared/guards/auth.guard'
import {LogoutEffect} from 'src/app/auth/store/effects/logout.effect'

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      LogoutEffect
    ]),
    BackendErrorMessageModule
  ],
  providers: [AuthService, PersistenceService]
})
export class AuthModule {}
