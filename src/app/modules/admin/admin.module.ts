import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NgZorroImportsModule } from '../../NgZorroImportsModule';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule for template-driven forms
    NzDatePickerModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzSelectModule,
    NzInputModule,
    NzSpinModule,
    NgZorroImportsModule,
    NzLayoutModule
  ],
  providers: [NzMessageService],
})
export class AdminModule {}
