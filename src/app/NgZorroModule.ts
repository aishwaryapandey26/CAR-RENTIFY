import { NgModule } from "@angular/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@NgModule({
  exports: [
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzLayoutModule,
    ///NzLayoutModule
  ]
})
export class NgZorroModule {}
