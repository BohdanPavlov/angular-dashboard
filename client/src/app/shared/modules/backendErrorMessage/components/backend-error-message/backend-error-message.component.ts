import {ChangeDetectionStrategy, Component, Input} from '@angular/core'

@Component({
  selector: 'app-backend-error-message',
  templateUrl: './backend-error-message.component.html',
  styleUrls: ['./backend-error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackendErrorMessageComponent {
  @Input() backendErrorMessage: string
}
