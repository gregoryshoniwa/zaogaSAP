import { GlobleProvider } from './../../providers/globle/globle';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { Component } from '@angular/core';
import { Events,IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';

/**
 * Generated class for the PrintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-print',
  templateUrl: 'print.html',
})
export class PrintPage {
 
  invoiceNumber;
  paymentNumber;
  journalNumber;
  docdata;
  itemList = [];
  TotalZWD = 0;
  TotalUSD = 0;
  TotalZAR = 0;
  TotalBWP = 0;
  TotalGBP = 0;
  TotalEUR = 0;
  date;
  sessionID;
  constructor(public events:Events, public restservice:RestapiserviceProvider,public globle: GlobleProvider, public sapservice:SapservicesProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.sessionID = this.navParams.get("sessionID");
   //this.navParams.get("invoice");
    this.paymentNumber = this.navParams.get("payment");
    //this.journalNumber = this.navParams.get("journal");
    this.docdata = this.navParams.get("docdata");
    this.invoiceNumber = this.docdata.receiptID
    if(this.docdata.paymentType == 'Unknown'){
      this.docdata.paymentType = 'Unpresented'
    }
    if(this.docdata.paymentType == 'Late'){
      this.docdata.paymentType = 'Pending Incoming Payment'
    }
    this.TotalZWD = parseFloat(this.docdata.totalZWD);
    this.TotalUSD = parseFloat(this.docdata.totalUSD);
    this.TotalZAR = parseFloat(this.docdata.totalZAR);
    this.TotalBWP = parseFloat(this.docdata.totalBWP);
    this.TotalGBP = parseFloat(this.docdata.totalGBP);
    this.TotalEUR = parseFloat(this.docdata.totalEUR);
    this.date = this.sapservice.datestamp;
    //this.docdata.journalNumber = this.journalNumber;
    this.docdata.date = this.date;
    this.restservice.sendReceipt(this.docdata);
   // console.log(this.docdata);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrintPage');
  }

  
  closeModel(){
    this.events.publish('finishedRemittance',{status: true});
    this.viewCtrl.dismiss();
}

print(componentName){
  this.globle.print(componentName);
}

}
