import { GlobleProvider } from './../../providers/globle/globle';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';

/**
 * Generated class for the ItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
  filteredusers = [];
  temparr = [];
  username;
  BusinessParnter;
  sessionID;
  AccountNumber = [];
  selectedData = {
    amountZWD : null,
    amountUSD : null,
    amountZAR : null,
    amountGBP : null,
    amountBWP : null,
    amountEUR : null,
    linkid : "",
    item : "",
    itemcode : "",
    itemaccount: {}

  }
  query = "SELECT T0.[ItemCode],T0.[ItemName],T0.[SWW] FROM OITM T0 WHERE T0.[ItemCode] LIKE 'MIN%' AND  T0.[ItemCode] LIKE '%01'";

  constructor(public global:GlobleProvider, public sapservice:SapservicesProvider, public alertCtrl: AlertController, public http: Http,public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.sessionID = this.navParams.get('sessionID');
    this.BusinessParnter = this.navParams.get('BusinessParnterName');
    this.getItemList(this.sessionID);
    this.temparr = this.filteredusers;
    console.log(this.filteredusers);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }


  getItemList(session){
    let headers = new Headers();

    let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
                '<env:Header>'+
                 '<SessionID>'+session+'</SessionID>'+
                    '</env:Header>'+
                    '<env:Body>'+
                    '<dis:ExecuteSQL xmlns:dis="http://www.sap.com/SBO/DIS">'+
                  '<DoQuery>'+this.query+'</DoQuery>'+
                '</dis:ExecuteSQL>'+
                '</env:Body>'+
                '</env:Envelope>';


    this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var items = xmlDoc.querySelectorAll("row");
      for (var index = 0; index < items.length; index++) {
        var element = items[index];
        this.filteredusers.push(element);
        //console.log(element);
      }

      //this.filteredusers = results;
      //this.temparr = results;
    });
   }




selected(Itemcode,Itemname,linkid){

  let query = "SELECT T0.[AcctCode], T0.[AcctName], T0.[AccntntCod] FROM OACT T0 WHERE T0.[AccntntCod] = '"+linkid+"'";
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<env:Header>'+
               '<SessionID>'+this.sessionID+'</SessionID>'+
                  '</env:Header>'+
                  '<env:Body>'+
                  '<dis:ExecuteSQL xmlns:dis="http://www.sap.com/SBO/DIS">'+
                '<DoQuery>'+query+'</DoQuery>'+
              '</dis:ExecuteSQL>'+
              '</env:Body>'+
              '</env:Envelope>';


  return -this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      for (var index = 0; index < 1; index++) {
        var results = xmlDoc.getElementsByTagName("AcctCode")[index].childNodes[0].nodeValue
        var element = results;
        this.AccountNumber.push(element);
        console.log(element);
      }
     // var results = xmlDoc.getElementsByTagName("AcctCode")[0].childNodes[0].nodeValue
      //this.AccountNumber = results;
      if(Itemcode){
        if(this.selectedData.amountZWD == null){
          this.selectedData.amountZWD = "0";
        }
        if(this.selectedData.amountUSD == null){
          this.selectedData.amountUSD = "0";
        }
        if(this.selectedData.amountZAR == null){
          this.selectedData.amountZAR = "0";
        }
        if(this.selectedData.amountBWP == null){
          this.selectedData.amountBWP = "0";
        }
        if(this.selectedData.amountGBP == null){
          this.selectedData.amountGBP = "0";
        }
        if(this.selectedData.amountEUR == null){
          this.selectedData.amountEUR = "0";
        }
        this.selectedData.item = Itemname;
        this.selectedData.itemcode = Itemcode;
        this.selectedData.linkid = linkid;

        this.selectedData.itemaccount = this.AccountNumber;
        this.selectedData.amountZWD = parseFloat(this.selectedData.amountZWD).toFixed(2);
        this.selectedData.amountUSD = parseFloat(this.selectedData.amountUSD).toFixed(2);
        this.selectedData.amountZAR = parseFloat(this.selectedData.amountZAR).toFixed(2);
        this.selectedData.amountBWP = parseFloat(this.selectedData.amountBWP).toFixed(2);
        this.selectedData.amountGBP = parseFloat(this.selectedData.amountGBP).toFixed(2);
        this.selectedData.amountEUR = parseFloat(this.selectedData.amountEUR).toFixed(2);

        this.viewCtrl.dismiss(this.selectedData);
      }else{
        this.viewCtrl.dismiss();
      }
      console.log(this.AccountNumber);
    }catch(e){
      this.errorAlert(e);
    }
    //this.filteredusers = results;
    //this.temparr = results;

  });


}

errorAlert(errorMessage)
 {
  let alert = this.alertCtrl.create({
    title: 'Remittance Add Failed',
    subTitle: errorMessage,
    buttons: ['Dismiss']
  });
  alert.present();
}



   presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Item Add Failed',
      subTitle: 'Please seleted a payment type, either Cash or Tranfer',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  searchuserp(searchbar){
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {

        if((v.childNodes[1].textContent.toLowerCase().indexOf(q.toLowerCase())) > -1){
           return true;
        }
      return false;

    })
  }


  closeModel(){

    this.viewCtrl.dismiss();
}


}
