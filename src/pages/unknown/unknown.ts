import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UnknownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unknown',
  templateUrl: 'unknown.html',
})
export class UnknownPage {
  sessionID;
  username;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sessionID = this.navParams.get('sessionID');
    this.username = this.navParams.get('userID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnknownPage');
  }

  navigator(page){
    if(page == 'Remittance'){
      this.navCtrl.setRoot(HomePage,{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
    if(page == 'Late'){
      this.navCtrl.setRoot('LatePage',{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
    if(page == 'Unknown'){
      //this.navCtrl.setRoot('UnknownPage',{sessionID:this.sessionID});
      page = null;
    }
    if(page == 'Reports'){
      this.navCtrl.setRoot('ReportsPage',{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
  }

}
