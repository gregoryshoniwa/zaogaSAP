import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobleProvider } from './../../providers/globle/globle';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import {Http,Headers} from '@angular/http';
/**
 * Generated class for the UpdateaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updateaccount',
  templateUrl: 'updateaccount.html',
})
export class UpdateaccountPage {
  filteredusers = [];
  temparr = [];
  accountDetails = {
    accountCode: "",
    accountName: "",
    accountType: "",
    accountCurrency: "",
  }
  sessionid;
  query = "SELECT T0.[AcctCode], T0.[AcctName] FROM OACT T0";
  constructor(public viewCtrl: ViewController, public sapservice:SapservicesProvider,public globle: GlobleProvider, public http: Http ,public navCtrl: NavController, public navParams: NavParams) {
    //console.log(this.globle.getSessionID());
    this.sessionid = this.globle.getSessionID();
    this.temparr = this.filteredusers;
    this.getAccountsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateaccountPage');
  }

  selected(accountCode,accountName){
    this.accountDetails.accountCode = accountCode;
    this.accountDetails.accountName = accountName;
    
    //console.log(this.accountDetails);
    this.viewCtrl.dismiss(this.accountDetails);
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
getAccountsList(){
  let headers = new Headers();
  
  let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
              '<env:Header>'+
               '<SessionID>'+this.sessionid+'</SessionID>'+
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


}
