import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
 userData;
 filteredusers;
 active1 = false;
 missionData;
 educationData;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userData = this.navParams.get('pastordetails');
    this.filteredusers = this.navParams.get('deploydata');
    this.missionData = this.navParams.get('missionData');
    this.educationData = this.navParams.get('educationData');
    console.log(this.missionData);
    if(this.filteredusers == "Non"){
      this.active1 = true;
    }else{
      this.active1 = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    
  }

}
