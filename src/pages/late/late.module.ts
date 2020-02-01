import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LatePage } from './late';

@NgModule({
  declarations: [
    LatePage,
  ],
  imports: [
    IonicPageModule.forChild(LatePage),
  ],
})
export class LatePageModule {}
