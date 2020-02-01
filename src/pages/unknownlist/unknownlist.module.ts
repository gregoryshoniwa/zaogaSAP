import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnknownlistPage } from './unknownlist';

@NgModule({
  declarations: [
    UnknownlistPage,
  ],
  imports: [
    IonicPageModule.forChild(UnknownlistPage),
  ],
})
export class UnknownlistPageModule {}
