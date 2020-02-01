import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';

/**
 * Generated class for the CashbdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cashbd',
  templateUrl: 'cashbd.html',
})
export class CashbdPage {
  CashNotes = {
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    tencoin : null,
    fivecoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  

  constructor(public alertCtrl:AlertController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  
    this.CashNotes = this.navParams.get('breakdown');
   // console.log(this.CashNotes)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CashbdPage');
  }

  closeModel(){
    
    this.viewCtrl.dismiss();
}

Link(){
  // if(this.CashNotes.currency != null){
  let notes = (this.CashNotes.twohundred*200) + (this.CashNotes.hundred*100) + (this.CashNotes.twenty*20) + (this.CashNotes.fifty*50) + (this.CashNotes.ten*10) + (this.CashNotes.five*5) + (this.CashNotes.two*2) + (this.CashNotes.one*1);
  let coins = (this.CashNotes.dollarcoin*1) + (this.CashNotes.fiftycoin*0.50) + (this.CashNotes.twentyfivecoin*0.25) + (this.CashNotes.tencoin*0.1) + (this.CashNotes.fivecoin*0.05) + (this.CashNotes.onecoin*0.01);
  this.CashNotes.total = notes + coins;
  //console.log(this.CashNotes.total);
  this.viewCtrl.dismiss(this.CashNotes);
  // }else{
  //   this.presentAlert(); 
  // }
  
}

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Cash Break Down Error',
    subTitle: 'Please select a currency for your denominations.',
    buttons: ['Dismiss']
  });
  alert.present();
}

}
