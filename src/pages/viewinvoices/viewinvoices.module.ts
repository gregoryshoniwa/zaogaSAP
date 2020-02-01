import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewinvoicesPage } from './viewinvoices';

@NgModule({
  declarations: [
    ViewinvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewinvoicesPage),
  ],
})
export class ViewinvoicesPageModule {}
