import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {TopBarComponent} from 'src/app/shared/modules/topBar/components/topBar/topBar.component'
import {RouterLink} from '@angular/router'

@NgModule({
  declarations: [TopBarComponent],
  imports: [CommonModule, RouterLink],
  exports: [TopBarComponent]
})
export class TopBarModule {}
