import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,AlertController } from 'ionic-angular';

/**
 * Generated class for the HandoverbdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-handoverbd',
  templateUrl: 'handoverbd.html',
})
export class HandoverbdPage {

  CashNotesZWD = {
    fivehundred : null,
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    fivedollarcoin : null,
    twodollarcoin : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    twentycoin: null,
    tencoin : null,
    fivecoin : null,
    twocoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  CashNotesUSD = {
    fivehundred : null,
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    fivedollarcoin : null,
    twodollarcoin : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    twentycoin: null,
    tencoin : null,
    fivecoin : null,
    twocoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  CashNotesZAR = {
    fivehundred : null,
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    fivedollarcoin : null,
    twodollarcoin : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    twentycoin: null,
    tencoin : null,
    fivecoin : null,
    twocoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  CashNotesBWP = {
    fivehundred : null,
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    fivedollarcoin : null,
    twodollarcoin : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    twentycoin: null,
    tencoin : null,
    fivecoin : null,
    twocoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  CashNotesGBP = {
    fivehundred : null,
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    fivedollarcoin : null,
    twodollarcoin : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    twentycoin: null,
    tencoin : null,
    fivecoin : null,
    twocoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  CashNotesEUR = {
    fivehundred : null,
    twohundred : null,
    hundred : null,
    fifty : null,
    twenty : null,
    ten : null,
    five : null,
    two : null,
    one : null,
    fivedollarcoin : null,
    twodollarcoin : null,
    dollarcoin : null,
    fiftycoin : null,
    twentyfivecoin: null,
    twentycoin: null,
    tencoin : null,
    fivecoin : null,
    twocoin : null,
    onecoin : null,
    currency: null,
    total: null  
  }
  currency;
  

  constructor(public alertCtrl:AlertController, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
  
    
    this.currency = this.navParams.get('currency');
    if(this.currency == 'ZWD'){
      this.CashNotesZWD = this.navParams.get('breakdown');
    }
    if(this.currency == 'ZAR'){
      this.CashNotesZAR = this.navParams.get('breakdown');
    }
    if(this.currency == 'BWP'){
      this.CashNotesBWP = this.navParams.get('breakdown');
    }
    if(this.currency == 'GBP'){
      this.CashNotesGBP = this.navParams.get('breakdown');
    }
    if(this.currency == 'EUR'){
      this.CashNotesEUR = this.navParams.get('breakdown');
    }
    if(this.currency == 'USD'){
      this.CashNotesUSD = this.navParams.get('breakdown');
    }
   // console.log(this.CashNotes)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HandOverbgPage');
  }
  onKeyPressed(e){
    //console.log(e.keyCode)
    if(e.keyCode == 13){
      this.Link()
    }
  }

  closeModel(){
    
    this.viewCtrl.dismiss();
}

Link(){
  // if(this.CashNotes.currency != null){
  if(this.currency == 'ZWD'){
    let notes = (this.CashNotesUSD.five*5) + (this.CashNotesZWD.two*2);
    let coins = (this.CashNotesZWD.dollarcoin*1) + (this.CashNotesZWD.fiftycoin*0.50) + (this.CashNotesZWD.twentyfivecoin*0.25) + (this.CashNotesZWD.tencoin*0.1) + (this.CashNotesZWD.fivecoin*0.05);
    this.CashNotesZWD.total = notes + coins;  
    //console.log(this.CashNotesZWD)  
    this.viewCtrl.dismiss(this.CashNotesZWD);
  }
  if(this.currency == 'ZAR'){
    let notes = (this.CashNotesZAR.twohundred*200) + (this.CashNotesZAR.hundred*100) + (this.CashNotesZAR.twenty*20) + (this.CashNotesZAR.fifty*50) + (this.CashNotesZAR.ten*10);
    let coins = (this.CashNotesZAR.fivedollarcoin*5) + (this.CashNotesZAR.twodollarcoin*2) + (this.CashNotesZAR.dollarcoin*1) + (this.CashNotesZAR.fiftycoin*0.50) + (this.CashNotesZAR.twentycoin*0.20) + (this.CashNotesZAR.tencoin*0.1) + (this.CashNotesZAR.fivecoin*0.05);
    this.CashNotesZAR.total = notes + coins;    
    this.viewCtrl.dismiss(this.CashNotesZAR);
  }
  if(this.currency == 'BWP'){
    let notes = (this.CashNotesBWP.twohundred*200) + (this.CashNotesBWP.hundred*100) + (this.CashNotesBWP.twenty*20) + (this.CashNotesBWP.fifty*50) + (this.CashNotesBWP.ten*10);
    let coins = (this.CashNotesBWP.fivedollarcoin*5) + (this.CashNotesBWP.twodollarcoin*2) + (this.CashNotesBWP.dollarcoin*1) + (this.CashNotesBWP.fiftycoin*0.50) + (this.CashNotesBWP.twentyfivecoin*0.25) + (this.CashNotesBWP.tencoin*0.1) + (this.CashNotesBWP.fivecoin*0.05) + (this.CashNotesBWP.onecoin*0.01);
    this.CashNotesBWP.total = notes + coins;    
    this.viewCtrl.dismiss(this.CashNotesBWP);
  }
  if(this.currency == 'USD'){
    let notes = (this.CashNotesUSD.hundred*100) + (this.CashNotesUSD.twenty*20) + (this.CashNotesUSD.fifty*50) + (this.CashNotesUSD.ten*10) + (this.CashNotesUSD.five*5) + (this.CashNotesUSD.two*2) + (this.CashNotesUSD.one*1);
    this.CashNotesUSD.total = notes + 0;    
    this.viewCtrl.dismiss(this.CashNotesUSD);
  }
  if(this.currency == 'GBP'){
    let notes = (this.CashNotesGBP.fifty*50) + (this.CashNotesGBP.ten*10) + (this.CashNotesGBP.five*5);
    let coins = (this.CashNotesGBP.twodollarcoin*2) + (this.CashNotesGBP.dollarcoin*1) + (this.CashNotesGBP.fiftycoin*0.50) + (this.CashNotesGBP.twentycoin*0.20) + (this.CashNotesGBP.tencoin*0.1) + (this.CashNotesGBP.fivecoin*0.05) + (this.CashNotesGBP.twocoin*0.02) + (this.CashNotesGBP.onecoin*0.01);
    this.CashNotesGBP.total = notes + coins;    
    this.viewCtrl.dismiss(this.CashNotesGBP);
  }
  if(this.currency == 'EUR'){
    let notes = (this.CashNotesEUR.fivehundred*500) +(this.CashNotesEUR.twohundred*200) + (this.CashNotesEUR.hundred*100) + (this.CashNotesEUR.twenty*20) + (this.CashNotesEUR.fifty*50) + (this.CashNotesEUR.ten*10) + (this.CashNotesEUR.five*5);
    let coins = (this.CashNotesEUR.twodollarcoin*2) + (this.CashNotesEUR.dollarcoin*1) + (this.CashNotesEUR.fiftycoin*0.50) + (this.CashNotesEUR.twentycoin*0.20) + (this.CashNotesEUR.tencoin*0.1) + (this.CashNotesEUR.fivecoin*0.05) + (this.CashNotesEUR.twocoin*0.02) + (this.CashNotesEUR.onecoin*0.01);
    this.CashNotesEUR.total = notes + coins;    
    this.viewCtrl.dismiss(this.CashNotesEUR);
  }
  
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
