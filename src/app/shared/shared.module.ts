import { NgModule } from '@angular/core';

import { SharedComponent } from './shared.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DatePipe, CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataActionsComponent } from './data-actions/data-actions.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent,DataTableComponent,DataActionsComponent,PageHeaderComponent,SpinnerComponent],
  exports:[DataTableComponent,DataActionsComponent,PageHeaderComponent,SpinnerComponent],
  
})
export class SharedModule { }
