import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  exports: [
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,NzTableModule
  ]
})
export class NgZorroImportsModule {}
