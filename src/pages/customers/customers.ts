import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, ModalController } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  loader: Loading;


  filteredusers = [];
  temparr = [];
  username;
  BusinessParnterData = {
    BPCode: "",
    BPname: "",
    BPid: "",
    FirstName: "",
    LastName: "",
    email: ""
  }
  BusinessParnter;
  sessionID;
  url = "http://10.0.0.36/sap/images/";
  query = "SELECT T0.[CardCode],T0.[CardName], T0.[AddID],T1.[FirstName], T1.[LastName], T1.[Position], T1.[U_Photo], T1.[E_MailL] FROM OCRD T0  INNER JOIN OCPR T1 ON T0.[CardCode] = T1.[CardCode] WHERE T0.[CardType] = 'C' AND  T0.[Currency] = '##' AND T0.[CardCode] LIKE 'C%'";
  constructor(public modelCtrl : ModalController, public http: Http,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.sessionID = this.navParams.get('sessionID');
    this.BusinessParnter = this.navParams.get('BusinessParnterName');
    this.getBPList(this.sessionID);
    this.temparr = this.filteredusers;
    console.log(this.filteredusers);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  getBPList(session){
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


   checkPerson(imageName){
    let modal = this.modelCtrl.create('ImageviewPage',{imageUrl:this.url+encodeURIComponent(imageName) });
    modal.onDidDismiss(data => {


      });
    modal.present();

   }


   selected(BPCode,BPname,BPid,FirstName,LastName,email){
    this.BusinessParnterData.BPCode = BPCode;
    this.BusinessParnterData.BPname = BPname;
    this.BusinessParnterData.BPid = BPid;
    this.BusinessParnterData.FirstName = FirstName;
    this.BusinessParnterData.LastName = LastName;
    this.BusinessParnterData.email = email
    //console.log(BPCode);
    //console.log(BPname);
    this.viewCtrl.dismiss(this.BusinessParnterData);
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
