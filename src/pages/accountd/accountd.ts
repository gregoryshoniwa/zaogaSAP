import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { GlobleProvider } from './../../providers/globle/globle';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
/**
 * Generated class for the AccountdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountd',
  templateUrl: 'accountd.html',
})
export class AccountdPage {
  filteredusers = [];
  temparr = [];
  accountDetails = {
    accountCode: "",
    accountName: "",
    accountType: "",
    accountCurrency: "",
  }
  constructor(public restservice:RestapiserviceProvider, public modelCtrl:ModalController, public sapservice:SapservicesProvider,public globle: GlobleProvider, public http: Http ,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.restservice.loadAccounts().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;
     //console.log(res);
      //console.log(this.filteredusers);
    })
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountdPage');
  }
  closeModel(){
    
    this.viewCtrl.dismiss();
}
addAccount(){
  let modal = this.modelCtrl.create('AddaccountPage');
    modal.onDidDismiss(data => {
    if(data){
      this.accountDetails.accountCode = data.accountCode;
      this.accountDetails.accountName = data.accountName;
      this.accountDetails.accountType = data.accountType;
      this.accountDetails.accountCurrency = data.accountCurrency;
      //console.log(this.accountDetails);
      this.restservice.addAccount(this.accountDetails);
    }
     
     // console.log(data);
  });
  modal.present();
}
checkPerson(dataid){
  let modal = this.modelCtrl.create('UpdateaccountPage');
  modal.onDidDismiss(data => {
  if(data){
    this.accountDetails.accountCode = data.accountCode;
    this.accountDetails.accountName = data.accountName;
    this.accountDetails.accountType = data.accountType;
    this.accountDetails.accountCurrency = data.accountCurrency;
   // console.log(dataid);
    this.restservice.updateAccount(this.accountDetails,dataid);
    
    this.filteredusers = [];
    this.temparr = [];
    this.restservice.loadAccounts().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;
     //console.log(res);
      //console.log(this.filteredusers);
    })
  }
   
   // console.log(data);
});
modal.present();
}


}
