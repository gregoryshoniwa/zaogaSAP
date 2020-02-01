import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DistrictaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-districtadd',
  templateUrl: 'districtadd.html',
})
export class DistrictaddPage {
  newdistrict = {
    district: '',
    province: '',
    country:'',
    createdUser: ''
  }
  constructor(public couchservice:CouchdbProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  this.newdistrict.createdUser = this.navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistrictsaddPage');
  }

  addUser(event){
    this.couchservice.addDistricts({districts:this.newdistrict});
    this.viewCtrl.dismiss();

  }
  closeModel(){
    
     this.viewCtrl.dismiss();
  }


}
