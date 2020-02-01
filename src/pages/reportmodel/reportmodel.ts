import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, ModalController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';

/**
 * Generated class for the ReportmodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportmodel',
  templateUrl: 'reportmodel.html',
})
export class ReportmodelPage {
  sessionID;
  reportType;
  BusinessParnter;
  ItemData;
  ReportYear;
  reportData = {
    bpname : null,
    itemname : null,
    bpcode : null,
    itemcode: null,
    year: null,
    currency: null
  };
  constructor(public modelCtrl : ModalController, public http: Http,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {

    this.sessionID = this.navParams.get('sessionID');
    this.reportType = this.navParams.get('reportType');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportmodelPage');
    console.log(this.sessionID);
  }


  customerList(name){
    let modal = this.modelCtrl.create('CustomersPage',{sessionID: this.sessionID});
    modal.onDidDismiss(data => {
    if(data){


      this.BusinessParnter = data.BPname;
      this.reportData.bpcode = data.BPCode;
      this.reportData.bpname = data.BPname;
      //console.log(data);
    }

     // console.log(data);
  });
  modal.present();
  }


  itemList(){
    let modal = this.modelCtrl.create('ItemsPage',{sessionID: this.sessionID });
    modal.onDidDismiss(data => {

    if(data){

      this.ItemData = data.item;
      this.reportData.itemcode = data.itemcode;
      this.reportData.itemname = data.item;
      //console.log(data.item);

    }
    });
    modal.present();
  }

  closeModel(){

    this.viewCtrl.dismiss();
}

okEx(){
  this.reportData.year = this.ReportYear;

  this.viewCtrl.dismiss(this.reportData);

}


}
