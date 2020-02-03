import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { Loading, AlertController, LoadingController,IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';

/**
 * Generated class for the LatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-late',
  templateUrl: 'late.html',
})
export class LatePage {
  loader: Loading;
  sessionID;
  username;
  date;
  TotalZWD = 0;
  TotalUSD = 0;
  TotalZAR = 0;
  TotalBWP = 0;
  TotalGBP = 0;
  TotalEUR = 0;
  CashBreakDown = [];
  CashBreakDownZWD = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownUSD = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownZAR = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownBWP = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownGBP = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownEUR = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];

  CashBreakDown2 = [];
  CashBreakDownZWD2 = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownUSD2 = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownZAR2 = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownBWP2 = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownGBP2 = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  CashBreakDownEUR2 = [
    {
      fivehundred : 0,
      twohundred : 0,
      hundred : 0,
      fifty : 0,
      twenty : 0,
      ten : 0,
      five : 0,
      two : 0,
      one : 0,
      fivedollarcoin : 0,
      twodollarcoin : 0,
      dollarcoin : 0,
      fiftycoin : 0,
      twentyfivecoin: 0,
      twentycoin: 0,
      tencoin : 0,
      fivecoin : 0,
      twocoin : 0,
      onecoin : 0,
      currency: 0,
      total: null  
    }
  ];
  cashTotal;
  cashTotalZWD;
  cashTotalUSD;
  cashTotalZAR;
  cashTotalBWP;
  cashTotalGBP;
  cashTotalEUR;
  bankTailer;
  loadedCashBreakDown;
  constructor(public loadingCtrl: LoadingController,public restservice:RestapiserviceProvider,public navCtrl: NavController, public navParams: NavParams,public modelCtrl:ModalController,) {
    this.sessionID = this.navParams.get('sessionID');
    this.username = this.navParams.get('userID');
    this.date = this.formatDate(Date.now());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LatePage');
  }

  
presentLoading() {
  this.loader = this.loadingCtrl.create({
    content: "Getting Remittance...",
    enableBackdropDismiss: true,
    duration: 5000
  });
  this.loader.present();
 
}
formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


cashbreakdown(currencyType){
  let currency = currencyType
  
  if(currency == 'ZWD'){
    this.CashBreakDown = []
    this.CashBreakDown.push(this.CashBreakDownZWD[0])
  }
  if(currency == 'ZAR'){
    this.CashBreakDown = []
    this.CashBreakDown.push(this.CashBreakDownZAR[0])
  }
  if(currency == 'USD'){
    this.CashBreakDown = []
    this.CashBreakDown.push(this.CashBreakDownUSD[0])
  }
  if(currency == 'BWP'){
    this.CashBreakDown = []
    this.CashBreakDown.push(this.CashBreakDownBWP[0])
  }
  if(currency == 'GBP'){
    this.CashBreakDown = []
    this.CashBreakDown.push(this.CashBreakDownGBP[0])
  }
  if(currency == 'EUR'){
    this.CashBreakDown = []
    this.CashBreakDown.push(this.CashBreakDownEUR[0])
  }
  let modal = this.modelCtrl.create('HandoverbdPage',{breakdown:this.CashBreakDown[0],currency:currency});
  modal.onDidDismiss(data => {

  if(data){

   // console.log(data);
    if(currency == 'ZWD'){
      this.CashBreakDownZWD2 = []
      this.CashBreakDownZWD2.push(data);
      this.cashTotalZWD = parseFloat(this.CashBreakDownZWD2[0].total).toFixed(2)
    }
    if(currency == 'USD'){
      this.CashBreakDownUSD2 = []
      this.CashBreakDownUSD2.push(data);
      this.cashTotalUSD = parseFloat(this.CashBreakDownUSD2[0].total).toFixed(2)
    }
    if(currency == 'ZAR'){
      this.CashBreakDownZAR2 = []
      this.CashBreakDownZAR2.push(data);
      this.cashTotalZAR = parseFloat(this.CashBreakDownZAR2[0].total).toFixed(2)
    }
    if(currency == 'BWP'){
      this.CashBreakDownBWP2 = []
      this.CashBreakDownBWP2.push(data);
      this.cashTotalBWP = parseFloat(this.CashBreakDownBWP2[0].total).toFixed(2)
    }
    if(currency == 'GBP'){
      this.CashBreakDownGBP2 = []
      this.CashBreakDownGBP2.push(data);
      this.cashTotalGBP = parseFloat(this.CashBreakDownGBP2[0].total).toFixed(2)
    }
    if(currency == 'EUR'){
      this.CashBreakDownEUR2 = []
      this.CashBreakDownEUR2.push(data);
      this.cashTotalEUR = parseFloat(this.CashBreakDownEUR2[0].total).toFixed(2)
    }
  
   // console.log(this.CashBreakDown);
    //this.calculator();

  }
  });
  modal.present();
}

onKeyPressed(e){
  //console.log(e.keyCode)
 
  if(e.keyCode == 13){
    this.presentLoading();
    //this.get()
    this.restservice.loadDayRemittance(this.bankTailer,this.date).then(data =>{
      let loadedData;
      loadedData = data
      this.loadedCashBreakDown = loadedData.data.one.recordset
      this.createBreakDown(this.loadedCashBreakDown)
     // console.log(this.loadedCashBreakDown)
    }).catch(err =>{
      console.log(err)
    })
  }
}

createBreakDown(data){
 data.forEach(element => {
   let newData = JSON.parse(element.RemittanceData)
  console.log(newData)

  //ZWD
   if(newData.cashbreakdownZWD.fivehundred){
     this.CashBreakDownZWD[0].fivehundred += Number(newData.cashbreakdownZWD.fivehundred)
   }
   if(newData.cashbreakdownZWD.twohundred){
    this.CashBreakDownZWD[0].twohundred += Number(newData.cashbreakdownZWD.twohundred)
  }
  if(newData.cashbreakdownZWD.hundred){
    this.CashBreakDownZWD[0].hundred += Number(newData.cashbreakdownZWD.hundred)
  }
  if(newData.cashbreakdownZWD.fifty){
    this.CashBreakDownZWD[0].fifty += Number(newData.cashbreakdownZWD.fifty)
  }
  if(newData.cashbreakdownZWD.twenty){
    this.CashBreakDownZWD[0].twenty += Number(newData.cashbreakdownZWD.twenty)
  }
  if(newData.cashbreakdownZWD.ten){
    this.CashBreakDownZWD[0].ten += Number(newData.cashbreakdownZWD.ten)
  }
  if(newData.cashbreakdownZWD.five){
    this.CashBreakDownZWD[0].five += Number(newData.cashbreakdownZWD.five)
  }
  if(newData.cashbreakdownZWD.two){
    this.CashBreakDownZWD[0].two += Number(newData.cashbreakdownZWD.two)
  }
  if(newData.cashbreakdownZWD.one){
    this.CashBreakDownZWD[0].one += Number(newData.cashbreakdownZWD.one)
  }
  if(newData.cashbreakdownZWD.fivedollarcoin){
    this.CashBreakDownZWD[0].fivedollarcoin += Number(newData.cashbreakdownZWD.fivedollarcoin)
  }
  if(newData.cashbreakdownZWD.twodollarcoin){
   this.CashBreakDownZWD[0].twodollarcoin += Number(newData.cashbreakdownZWD.twodollarcoin)
 }
 if(newData.cashbreakdownZWD.onecoin){
   this.CashBreakDownZWD[0].onecoin += Number(newData.cashbreakdownZWD.onecoin)
 }
 if(newData.cashbreakdownZWD.fiftycoin){
   this.CashBreakDownZWD[0].fiftycoin += Number(newData.cashbreakdownZWD.fiftycoin)
 }
 if(newData.cashbreakdownZWD.twentyfivecoin){
   this.CashBreakDownZWD[0].twentyfivecoin += Number(newData.cashbreakdownZWD.twentyfivecoin)
 }
 if(newData.cashbreakdownZWD.twentycoin){
   this.CashBreakDownZWD[0].twentycoin += Number(newData.cashbreakdownZWD.twentycoin)
 }
 if(newData.cashbreakdownZWD.tencoin){
   this.CashBreakDownZWD[0].tencoin += Number(newData.cashbreakdownZWD.tencoin)
 }
 if(newData.cashbreakdownZWD.fivecoin){
   this.CashBreakDownZWD[0].fivecoin += Number(newData.cashbreakdownZWD.fivecoin)
 }
 if(newData.cashbreakdownZWD.twocoin){
   this.CashBreakDownZWD[0].twocoin += Number(newData.cashbreakdownZWD.twocoin)
 }
 if(newData.cashbreakdownZWD.onecoin){
  this.CashBreakDownZWD[0].onecoin += Number(newData.cashbreakdownZWD.onecoin)
}


//ZAR
if(newData.cashbreakdownZAR.fivehundred){
  this.CashBreakDownZAR[0].fivehundred += Number(newData.cashbreakdownZAR.fivehundred)
}
if(newData.cashbreakdownZAR.twohundred){
 this.CashBreakDownZAR[0].twohundred += Number(newData.cashbreakdownZAR.twohundred)
}
if(newData.cashbreakdownZAR.hundred){
 this.CashBreakDownZAR[0].hundred += Number(newData.cashbreakdownZAR.hundred)
}
if(newData.cashbreakdownZAR.fifty){
 this.CashBreakDownZAR[0].fifty += Number(newData.cashbreakdownZAR.fifty)
}
if(newData.cashbreakdownZAR.twenty){
 this.CashBreakDownZAR[0].twenty += Number(newData.cashbreakdownZAR.twenty)
}
if(newData.cashbreakdownZAR.ten){
 this.CashBreakDownZAR[0].ten += Number(newData.cashbreakdownZAR.ten)
}
if(newData.cashbreakdownZAR.five){
 this.CashBreakDownZAR[0].five += Number(newData.cashbreakdownZAR.five)
}
if(newData.cashbreakdownZAR.two){
 this.CashBreakDownZAR[0].two += Number(newData.cashbreakdownZAR.two)
}
if(newData.cashbreakdownZAR.one){
 this.CashBreakDownZAR[0].one += Number(newData.cashbreakdownZAR.one)
}
if(newData.cashbreakdownZAR.fivedollarcoin){
 this.CashBreakDownZAR[0].fivedollarcoin += Number(newData.cashbreakdownZAR.fivedollarcoin)
}
if(newData.cashbreakdownZAR.twodollarcoin){
this.CashBreakDownZAR[0].twodollarcoin += Number(newData.cashbreakdownZAR.twodollarcoin)
}
if(newData.cashbreakdownZAR.onecoin){
this.CashBreakDownZAR[0].onecoin += Number(newData.cashbreakdownZAR.onecoin)
}
if(newData.cashbreakdownZAR.fiftycoin){
this.CashBreakDownZAR[0].fiftycoin += Number(newData.cashbreakdownZAR.fiftycoin)
}
if(newData.cashbreakdownZAR.twentyfivecoin){
this.CashBreakDownZAR[0].twentyfivecoin += Number(newData.cashbreakdownZAR.twentyfivecoin)
}
if(newData.cashbreakdownZAR.twentycoin){
this.CashBreakDownZAR[0].twentycoin += Number(newData.cashbreakdownZAR.twentycoin)
}
if(newData.cashbreakdownZAR.tencoin){
this.CashBreakDownZAR[0].tencoin += Number(newData.cashbreakdownZAR.tencoin)
}
if(newData.cashbreakdownZAR.fivecoin){
this.CashBreakDownZAR[0].fivecoin += Number(newData.cashbreakdownZAR.fivecoin)
}
if(newData.cashbreakdownZAR.twocoin){
this.CashBreakDownZAR[0].twocoin += Number(newData.cashbreakdownZAR.twocoin)
}
if(newData.cashbreakdownZAR.onecoin){
this.CashBreakDownZAR[0].onecoin += Number(newData.cashbreakdownZAR.onecoin)
}


//USD
if(newData.cashbreakdownUSD.fivehundred){
  this.CashBreakDownUSD[0].fivehundred += Number(newData.cashbreakdownUSD.fivehundred)
}
if(newData.cashbreakdownUSD.twohundred){
 this.CashBreakDownUSD[0].twohundred += Number(newData.cashbreakdownUSD.twohundred)
}
if(newData.cashbreakdownUSD.hundred){
 this.CashBreakDownUSD[0].hundred += Number(newData.cashbreakdownUSD.hundred)
}
if(newData.cashbreakdownUSD.fifty){
 this.CashBreakDownUSD[0].fifty += Number(newData.cashbreakdownUSD.fifty)
}
if(newData.cashbreakdownUSD.twenty){
 this.CashBreakDownUSD[0].twenty += Number(newData.cashbreakdownUSD.twenty)
}
if(newData.cashbreakdownUSD.ten){
 this.CashBreakDownUSD[0].ten += Number(newData.cashbreakdownUSD.ten)
}
if(newData.cashbreakdownUSD.five){
 this.CashBreakDownUSD[0].five += Number(newData.cashbreakdownUSD.five)
}
if(newData.cashbreakdownUSD.two){
 this.CashBreakDownUSD[0].two += Number(newData.cashbreakdownUSD.two)
}
if(newData.cashbreakdownUSD.one){
 this.CashBreakDownUSD[0].one += Number(newData.cashbreakdownUSD.one)
}
if(newData.cashbreakdownUSD.fivedollarcoin){
 this.CashBreakDownUSD[0].fivedollarcoin += Number(newData.cashbreakdownUSD.fivedollarcoin)
}
if(newData.cashbreakdownUSD.twodollarcoin){
this.CashBreakDownUSD[0].twodollarcoin += Number(newData.cashbreakdownUSD.twodollarcoin)
}
if(newData.cashbreakdownUSD.onecoin){
this.CashBreakDownUSD[0].onecoin += Number(newData.cashbreakdownUSD.onecoin)
}
if(newData.cashbreakdownUSD.fiftycoin){
this.CashBreakDownUSD[0].fiftycoin += Number(newData.cashbreakdownUSD.fiftycoin)
}
if(newData.cashbreakdownUSD.twentyfivecoin){
this.CashBreakDownUSD[0].twentyfivecoin += Number(newData.cashbreakdownUSD.twentyfivecoin)
}
if(newData.cashbreakdownUSD.twentycoin){
this.CashBreakDownUSD[0].twentycoin += Number(newData.cashbreakdownUSD.twentycoin)
}
if(newData.cashbreakdownUSD.tencoin){
this.CashBreakDownUSD[0].tencoin += Number(newData.cashbreakdownUSD.tencoin)
}
if(newData.cashbreakdownUSD.fivecoin){
this.CashBreakDownUSD[0].fivecoin += Number(newData.cashbreakdownUSD.fivecoin)
}
if(newData.cashbreakdownUSD.twocoin){
this.CashBreakDownUSD[0].twocoin += Number(newData.cashbreakdownUSD.twocoin)
}
if(newData.cashbreakdownUSD.onecoin){
this.CashBreakDownUSD[0].onecoin += Number(newData.cashbreakdownUSD.onecoin)
}

//BWP
if(newData.cashbreakdownBWP.fivehundred){
  this.CashBreakDownBWP[0].fivehundred += Number(newData.cashbreakdownBWP.fivehundred)
}
if(newData.cashbreakdownBWP.twohundred){
 this.CashBreakDownBWP[0].twohundred += Number(newData.cashbreakdownBWP.twohundred)
}
if(newData.cashbreakdownBWP.hundred){
 this.CashBreakDownBWP[0].hundred += Number(newData.cashbreakdownBWP.hundred)
}
if(newData.cashbreakdownBWP.fifty){
 this.CashBreakDownBWP[0].fifty += Number(newData.cashbreakdownBWP.fifty)
}
if(newData.cashbreakdownBWP.twenty){
 this.CashBreakDownBWP[0].twenty += Number(newData.cashbreakdownBWP.twenty)
}
if(newData.cashbreakdownBWP.ten){
 this.CashBreakDownBWP[0].ten += Number(newData.cashbreakdownBWP.ten)
}
if(newData.cashbreakdownBWP.five){
 this.CashBreakDownBWP[0].five += Number(newData.cashbreakdownBWP.five)
}
if(newData.cashbreakdownBWP.two){
 this.CashBreakDownBWP[0].two += Number(newData.cashbreakdownBWP.two)
}
if(newData.cashbreakdownBWP.one){
 this.CashBreakDownBWP[0].one += Number(newData.cashbreakdownBWP.one)
}
if(newData.cashbreakdownBWP.fivedollarcoin){
 this.CashBreakDownBWP[0].fivedollarcoin += Number(newData.cashbreakdownBWP.fivedollarcoin)
}
if(newData.cashbreakdownBWP.twodollarcoin){
this.CashBreakDownBWP[0].twodollarcoin += Number(newData.cashbreakdownBWP.twodollarcoin)
}
if(newData.cashbreakdownBWP.onecoin){
this.CashBreakDownBWP[0].onecoin += Number(newData.cashbreakdownBWP.onecoin)
}
if(newData.cashbreakdownBWP.fiftycoin){
this.CashBreakDownBWP[0].fiftycoin += Number(newData.cashbreakdownBWP.fiftycoin)
}
if(newData.cashbreakdownBWP.twentyfivecoin){
this.CashBreakDownBWP[0].twentyfivecoin += Number(newData.cashbreakdownBWP.twentyfivecoin)
}
if(newData.cashbreakdownBWP.twentycoin){
this.CashBreakDownBWP[0].twentycoin += Number(newData.cashbreakdownBWP.twentycoin)
}
if(newData.cashbreakdownBWP.tencoin){
this.CashBreakDownBWP[0].tencoin += Number(newData.cashbreakdownBWP.tencoin)
}
if(newData.cashbreakdownBWP.fivecoin){
this.CashBreakDownBWP[0].fivecoin += Number(newData.cashbreakdownBWP.fivecoin)
}
if(newData.cashbreakdownBWP.twocoin){
this.CashBreakDownBWP[0].twocoin += Number(newData.cashbreakdownBWP.twocoin)
}
if(newData.cashbreakdownBWP.onecoin){
this.CashBreakDownBWP[0].onecoin += Number(newData.cashbreakdownBWP.onecoin)
}

//GBP
if(newData.cashbreakdownGBP.fivehundred){
  this.CashBreakDownGBP[0].fivehundred += Number(newData.cashbreakdownGBP.fivehundred)
}
if(newData.cashbreakdownGBP.twohundred){
 this.CashBreakDownGBP[0].twohundred += Number(newData.cashbreakdownGBP.twohundred)
}
if(newData.cashbreakdownGBP.hundred){
 this.CashBreakDownGBP[0].hundred += Number(newData.cashbreakdownGBP.hundred)
}
if(newData.cashbreakdownGBP.fifty){
 this.CashBreakDownGBP[0].fifty += Number(newData.cashbreakdownGBP.fifty)
}
if(newData.cashbreakdownGBP.twenty){
 this.CashBreakDownGBP[0].twenty += Number(newData.cashbreakdownGBP.twenty)
}
if(newData.cashbreakdownGBP.ten){
 this.CashBreakDownGBP[0].ten += Number(newData.cashbreakdownGBP.ten)
}
if(newData.cashbreakdownGBP.five){
 this.CashBreakDownGBP[0].five += Number(newData.cashbreakdownGBP.five)
}
if(newData.cashbreakdownGBP.two){
 this.CashBreakDownGBP[0].two += Number(newData.cashbreakdownGBP.two)
}
if(newData.cashbreakdownGBP.one){
 this.CashBreakDownGBP[0].one += Number(newData.cashbreakdownGBP.one)
}
if(newData.cashbreakdownGBP.fivedollarcoin){
 this.CashBreakDownGBP[0].fivedollarcoin += Number(newData.cashbreakdownGBP.fivedollarcoin)
}
if(newData.cashbreakdownGBP.twodollarcoin){
this.CashBreakDownGBP[0].twodollarcoin += Number(newData.cashbreakdownGBP.twodollarcoin)
}
if(newData.cashbreakdownGBP.onecoin){
this.CashBreakDownGBP[0].onecoin += Number(newData.cashbreakdownGBP.onecoin)
}
if(newData.cashbreakdownGBP.fiftycoin){
this.CashBreakDownGBP[0].fiftycoin += Number(newData.cashbreakdownGBP.fiftycoin)
}
if(newData.cashbreakdownGBP.twentyfivecoin){
this.CashBreakDownGBP[0].twentyfivecoin += Number(newData.cashbreakdownGBP.twentyfivecoin)
}
if(newData.cashbreakdownGBP.twentycoin){
this.CashBreakDownGBP[0].twentycoin += Number(newData.cashbreakdownGBP.twentycoin)
}
if(newData.cashbreakdownGBP.tencoin){
this.CashBreakDownGBP[0].tencoin += Number(newData.cashbreakdownGBP.tencoin)
}
if(newData.cashbreakdownGBP.fivecoin){
this.CashBreakDownGBP[0].fivecoin += Number(newData.cashbreakdownGBP.fivecoin)
}
if(newData.cashbreakdownGBP.twocoin){
this.CashBreakDownGBP[0].twocoin += Number(newData.cashbreakdownGBP.twocoin)
}
if(newData.cashbreakdownGBP.onecoin){
this.CashBreakDownGBP[0].onecoin += Number(newData.cashbreakdownGBP.onecoin)
}

//EUR
if(newData.cashbreakdownEUR.fivehundred){
  this.CashBreakDownEUR[0].fivehundred += Number(newData.cashbreakdownEUR.fivehundred)
}
if(newData.cashbreakdownEUR.twohundred){
 this.CashBreakDownEUR[0].twohundred += Number(newData.cashbreakdownEUR.twohundred)
}
if(newData.cashbreakdownEUR.hundred){
 this.CashBreakDownEUR[0].hundred += Number(newData.cashbreakdownEUR.hundred)
}
if(newData.cashbreakdownEUR.fifty){
 this.CashBreakDownEUR[0].fifty += Number(newData.cashbreakdownEUR.fifty)
}
if(newData.cashbreakdownEUR.twenty){
 this.CashBreakDownEUR[0].twenty += Number(newData.cashbreakdownEUR.twenty)
}
if(newData.cashbreakdownEUR.ten){
 this.CashBreakDownEUR[0].ten += Number(newData.cashbreakdownEUR.ten)
}
if(newData.cashbreakdownEUR.five){
 this.CashBreakDownEUR[0].five += Number(newData.cashbreakdownEUR.five)
}
if(newData.cashbreakdownEUR.two){
 this.CashBreakDownEUR[0].two += Number(newData.cashbreakdownEUR.two)
}
if(newData.cashbreakdownEUR.one){
 this.CashBreakDownEUR[0].one += Number(newData.cashbreakdownEUR.one)
}
if(newData.cashbreakdownEUR.fivedollarcoin){
 this.CashBreakDownEUR[0].fivedollarcoin += Number(newData.cashbreakdownEUR.fivedollarcoin)
}
if(newData.cashbreakdownEUR.twodollarcoin){
this.CashBreakDownEUR[0].twodollarcoin += Number(newData.cashbreakdownEUR.twodollarcoin)
}
if(newData.cashbreakdownEUR.onecoin){
this.CashBreakDownEUR[0].onecoin += Number(newData.cashbreakdownEUR.onecoin)
}
if(newData.cashbreakdownEUR.fiftycoin){
this.CashBreakDownEUR[0].fiftycoin += Number(newData.cashbreakdownEUR.fiftycoin)
}
if(newData.cashbreakdownEUR.twentyfivecoin){
this.CashBreakDownEUR[0].twentyfivecoin += Number(newData.cashbreakdownEUR.twentyfivecoin)
}
if(newData.cashbreakdownEUR.twentycoin){
this.CashBreakDownEUR[0].twentycoin += Number(newData.cashbreakdownEUR.twentycoin)
}
if(newData.cashbreakdownEUR.tencoin){
this.CashBreakDownEUR[0].tencoin += Number(newData.cashbreakdownEUR.tencoin)
}
if(newData.cashbreakdownEUR.fivecoin){
this.CashBreakDownEUR[0].fivecoin += Number(newData.cashbreakdownEUR.fivecoin)
}
if(newData.cashbreakdownEUR.twocoin){
this.CashBreakDownEUR[0].twocoin += Number(newData.cashbreakdownEUR.twocoin)
}
if(newData.cashbreakdownEUR.onecoin){
this.CashBreakDownEUR[0].onecoin += Number(newData.cashbreakdownEUR.onecoin)
}
   
   this.TotalZWD += Number(newData.totalZWD)
   this.TotalZAR += Number(newData.totalZAR)
   this.TotalUSD += Number(newData.totalUSD)
   this.TotalBWP += Number(newData.totalBWP)
   this.TotalGBP += Number(newData.totalGBP)
   this.TotalEUR += Number(newData.totalEUR)
 });
 this.loader.dismiss();
}
  navigator(page){
    if(page == 'Remittance'){
      this.navCtrl.popToRoot();
      page = null;
    }
   
    
    if(page == 'Reports'){
      this.navCtrl.push('ReportsPage',{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
  }

}
