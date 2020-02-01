import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DeployhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deployhistory',
  templateUrl: 'deployhistory.html',
})
export class DeployhistoryPage {
  filteredusers = [];
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.filteredusers = this.navParams.get('deploydata');
    
    //console.log(this.filteredusers);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeployhistoryPage');
   
  }
  closeModel(){
    
    this.viewCtrl.dismiss();
}

}
