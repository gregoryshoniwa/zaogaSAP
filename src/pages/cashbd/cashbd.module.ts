import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashbdPage } from './cashbd';

@NgModule({
  declarations: [
    CashbdPage,
  ],
  imports: [
    IonicPageModule.forChild(CashbdPage),
  ],
})
export class CashbdPageModule {}
