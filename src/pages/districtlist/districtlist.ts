import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, ModalController, ViewController } from 'ionic-angular';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';

/**
 * Generated class for the DistrictlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-districtlist',
  templateUrl: 'districtlist.html',
})
export class DistrictlistPage {
  loader: Loading;
  
  
  filteredusers = [];
  temparr = [];
  doc;
  constructor(public modelCtrl:ModalController, public couchservice:CouchdbProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  searchuserp(searchbar){
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {

        if((v.districts.district.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.districts.province.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.districts.country.toLowerCase().indexOf(q.toLowerCase())) > -1 ){
           return true;
        }
      return false;

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DistrictsPage');
    this.couchservice.loadDistricts().then((data) =>{
      //this.doc = data;
      console.log(data);
      this.filteredusers = data;
      this.temparr = this.filteredusers;
      //console.log(data);
    });
  }

  closeModel(){
    
     this.viewCtrl.dismiss();
  }

  selectedDistrict(district){
    //console.log(district);
    this.viewCtrl.dismiss(district);
  }

  adddistrict(){
    let modal = this.modelCtrl.create('DistrictaddPage');
    modal.onDidDismiss(data => {
      
    });
    modal.present();
  }

}
