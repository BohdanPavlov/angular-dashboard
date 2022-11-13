import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'

import {registerAction} from 'src/app/auth/store/actions/register.action'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {
  backendErrorMessageSelector,
  isLoginModeSelector,
  isSubmittingSelector
} from 'src/app/auth/store/selectors'
import {AuthRequestInterface} from 'src/app/auth/types/authRequest.interface'
import {switchAuthModeAction} from 'src/app/auth/store/actions/switchAuthMode.action'
import {loginAction} from 'src/app/auth/store/actions/login.action'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  public form: FormGroup
  public isSubmitting$: Observable<boolean>
  public backendErrorMessage$: Observable<string> | null
  public isLoginMode$: Observable<boolean>
  public isLoginMode: boolean
  private isLoginModeSub: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrorMessage$ = this.store.pipe(
      select(backendErrorMessageSelector)
    )
    this.isLoginMode$ = this.store.pipe(select(isLoginModeSelector))
    this.isLoginModeSub = this.isLoginMode$.subscribe(
      (isLoginMode: boolean) => {
        this.isLoginMode = isLoginMode
      }
    )
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    const request: AuthRequestInterface = this.form.value
    if (this.isLoginMode) {
      this.store.dispatch(loginAction({request}))
    } else {
      this.store.dispatch(registerAction({request}))
    }
  }

  onToggleAuthMode(): void {
    this.store.dispatch(switchAuthModeAction())
  }

  ngOnDestroy(): void {
    this.isLoginModeSub.unsubscribe()
  }
}
