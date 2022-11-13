import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'

import {AppStateInterface} from 'src/app/shared/types/appState.interface'
import {closeModalAction} from 'src/app/dashboard/store/actions/closeModal.action'
import {createBoardAction} from 'src/app/dashboard/store/actions/createBoard.action'
import {CreateBoardRequestInterface} from 'src/app/dashboard/types/createBoardRequest.interface'
import {currentBoardSelector} from 'src/app/dashboard/store/selectors'
import {BoardInterface} from 'src/app/shared/types/board.interface'
import {editBoardAction} from 'src/app/dashboard/store/actions/editBoard.action'

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardModalComponent implements OnInit, OnDestroy {
  public forbiddenName = 'Test'
  public modalForm: FormGroup
  public currentBoard$: Observable<BoardInterface>
  public currentBoard: BoardInterface
  private currentBoardSub: Subscription

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeForm()
  }

  initializeForm(): void {
    this.modalForm = this.fb.group({
      name: [
        this.currentBoard ? this.currentBoard.name : '',
        [
          Validators.required,
          Validators.maxLength(15),
          this.forbiddenNameCheck.bind(this)
        ]
      ],
      description: [
        this.currentBoard ? this.currentBoard.description : '',
        [Validators.maxLength(50)]
      ]
    })
  }

  initializeValues(): void {
    this.currentBoard$ = this.store.pipe(select(currentBoardSelector))
    this.currentBoardSub = this.currentBoard$.subscribe(
      (currentBoard: BoardInterface) => {
        this.currentBoard = currentBoard
      }
    )
  }

  forbiddenNameCheck(control: FormControl): {[p: string]: boolean} | null {
    if (this.forbiddenName === control.value) {
      return {nameIsForbidden: true}
    }
    return null
  }

  onSubmit(): void {
    const request: CreateBoardRequestInterface = this.modalForm.value

    if (this.currentBoard) {
      this.store.dispatch(
        editBoardAction({request: request, board: this.currentBoard})
      )
    } else {
      this.store.dispatch(createBoardAction({request: request}))
    }
    this.onModalClose()
  }

  onModalClose(): void {
    this.store.dispatch(closeModalAction())
  }

  ngOnDestroy(): void {
    this.currentBoardSub.unsubscribe()
  }
}
