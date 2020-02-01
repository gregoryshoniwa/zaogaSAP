import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnknownPage } from './unknown';

@NgModule({
  declarations: [
    UnknownPage,
  ],
  imports: [
    IonicPageModule.forChild(UnknownPage),
  ],
})
export class UnknownPageModule {}
