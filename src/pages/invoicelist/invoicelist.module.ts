import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicelistPage } from './invoicelist';

@NgModule({
  declarations: [
    InvoicelistPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicelistPage),
  ],
})
export class InvoicelistPageModule {}
