import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StoreModule} from '@ngrx/store'
import {FormsModule} from '@angular/forms'

import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {DropdownComponent} from './components/dropdown/dropdown.component'
import {reducer} from 'src/app/shared/modules/toolbar/store/reducers'

@NgModule({
  declarations: [ToolbarComponent, DropdownComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('toolbar', reducer),
    FormsModule
  ],
  exports: [ToolbarComponent, DropdownComponent]
})
export class ToolbarModule {}
