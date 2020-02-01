import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistrictlistPage } from './districtlist';

@NgModule({
  declarations: [
    DistrictlistPage,
  ],
  imports: [
    IonicPageModule.forChild(DistrictlistPage),
  ],
})
export class DistrictlistPageModule {}
