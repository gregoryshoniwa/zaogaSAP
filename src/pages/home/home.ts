import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { LoginPage } from './../login/login';
import { PopmenuComponent } from './../../components/popmenu/popmenu';

import { Http,Headers } from '@angular/http';
import { GlobleProvider } from './../../providers/globle/globle';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';

import { Component } from '@angular/core';

import { Events, NavController, Loading, NavParams, LoadingController, ModalController, AlertController, DateTime, PopoverController, IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sessionID;
  username;
  receiptCount = 0;
  loader: Loading;
  BusinessParnter;
  UnknownAccount;
  description;
  date;
  duedate;
  paymentType;
  reference;
  transferdate;
  remittanceData = {
    cardcode: "",
    cardname : "",
    firstName: "",
    lastName: "",
    email: "",
    description : "",
    date : DateTime,
    duedate: "",
    items: {},
    receiptID:"",
    cashbreakdownZWD: {},
    cashbreakdownUSD: {},
    cashbreakdownZAR: {},
    cashbreakdownBWP: {},
    cashbreakdownGBP: {},
    cashbreakdownEUR: {},
    paymentType : "",
    ref: "",
    totalZWD : "",
    totalUSD : "",
    totalZAR : "",
    totalBWP : "",
    totalGBP : "",
    totalEUR : "",
    transferDate : "",
    addid : "",
    docentry: "",
    owner: "",
    userID:"",
    ownerFirstName: "",
    ownerLastName : ""

  };
  isApprover = false;
  istranfer = false;
  isKnown = false;
  isLate = false;
  isCash = false;
  toggler = "";
  toggler2 = "";
  itemsList = [];
  CashBreakDown = [];
  CashBreakDownZWD = [
    {
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
  ];
  CashBreakDownUSD = [
    {
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
  ];
  CashBreakDownZAR = [
    {
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
  ];
  CashBreakDownBWP = [
    {
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
  ];
  CashBreakDownGBP = [
    {
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
  ];
  CashBreakDownEUR = [
    {
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
  ];
  TotalZWD = 0;
  TotalUSD = 0;
  TotalZAR = 0;
  TotalBWP = 0;
  TotalGBP = 0;
  TotalEUR = 0;
  complited = null;
  accountCode;
  accountCode2;
  accountCodeZAR;
  accountCodeZAR2;
  accountCodeZWD;
  accountCodeZWD2;
  accountCodeBWP;
  accountCodeBWP2;
  accountCodeGBP;
  accountCodeGBP2;
  accountCodeEUR;
  accountCodeEUR2;
  unknownCurrency;
  unknownAmount;
  remittanceID;
  cred = {
    username: "manager",
    password: "jesus@"
  };
  LoginService = "LoginServiceTest";
  unknownID;
  db = "ZAGOA_TEST";
  url = "http://10.0.0.36/B1WS/Service.asmx";
  numberOfOpenInoives = [];
  count = [];
  massages;
  cashTotal;
  cashTotalZWD;
  cashTotalUSD;
  cashTotalZAR;
  cashTotalBWP;
  cashTotalGBP;
  cashTotalEUR;
  constructor(public events:Events, public restservice:RestapiserviceProvider, public popover: PopoverController,public http: Http, public global:GlobleProvider, public alertCtrl: AlertController, public sapservice:SapservicesProvider, public modelCtrl:ModalController, public loadingCtrl: LoadingController, public navCtrl: NavController,public navParams: NavParams) {

    //this.presentLoading();
    this.sessionID = this.navParams.get('sessionID');
    this.username = this.navParams.get('userID');
    this.remittanceData.userID = this.navParams.get('userID');
    this.global.setUserID(this.username);
    this.cred.username = this.username;
    this.cred.password = this.navParams.get('userPass');
    this.getDocOwner(this.cred.username);
    this.date = this.formatDate(Date.now());
    this.duedate = this.formatDate(Date.now());
    this.transferdate = this.formatDate(Date.now());
    if(this.cred.username == "manager" || this.cred.username == "ZHQF07" || this.cred.username == "ZHQP03"){
      this.isApprover = true
    }

  }

ionViewDidLoad(){
  this.events.subscribe('finishedRemittance',(data) =>{
    //console.log(data);
    if(data.status){
      this.clearList()
      this.receiptCount = 0
      this.UnknownAccount = '';
      this.BusinessParnter = null
      this.description = null
      this.date = this.formatDate(Date.now())
      this.duedate = this.formatDate(Date.now())
      this.paymentType = null
      this.reference = null
      this.transferdate = this.formatDate(Date.now())
      this.isApprover = false;
      this.istranfer = false;
      this.isKnown = false;
      this.isLate = false;
      this.isCash = false;
    }
  })
  this.restservice.loadInvoicesAllOpen().then((data) =>{
    this.numberOfOpenInoives.push(data);
    this.count = this.numberOfOpenInoives[0];
    this.massages = this.count.length;
   // console.log(data);
   });
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

  getDocOwner(user){
    let query = "SELECT T0.[empID],T0.[firstName] ,T0.[lastName]  FROM OHEM T0  INNER JOIN OUSR T1 ON T0.[userId] = T1.[USERID] WHERE T1.[USER_CODE] = '"+user+"'";
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


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      //var ownerID = xmlDoc.querySelectorAll("row");
      var results = xmlDoc.getElementsByTagName("empID")[0].childNodes[0].nodeValue
      var firstName = xmlDoc.getElementsByTagName("firstName")[0].childNodes[0].nodeValue
      var lastName = xmlDoc.getElementsByTagName("lastName")[0].childNodes[0].nodeValue
    // console.log(xmlDoc);
      this.remittanceData.owner = results;
      this.remittanceData.ownerFirstName = firstName;
      this.remittanceData.ownerLastName = lastName;
      //this.filteredusers = results;
      //this.temparr = results;
    });
   }

  changeisTransfer() {
    if(this.paymentType == "Cash"){
      this.istranfer = false;
      this.isKnown = false;
      this.isLate = false;
      this.isCash = true;
    }
    if(this.paymentType == "Transfer"){
      this.istranfer = true;
      this.isKnown = false;
      this.isLate = false;
      this.isCash = false;
    }
    if(this.paymentType == "Unknown"){
      this.isKnown = true;
      this.istranfer = false;
      this.isLate = false;
      this.isCash = false;
    }
    if(this.paymentType == "Late"){
      this.isKnown = false;
      this.istranfer = false;
      this.isLate = true;
      this.isCash = false;
    }

  }


  clearList(){
    this.itemsList = [];
    this.CashBreakDown = [];
    this.CashBreakDownZAR = [{
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
    }];
    this.CashBreakDownZWD = [{
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
    }];
    this.CashBreakDownUSD = [{
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
    }];
    this.CashBreakDownGBP = [{
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
    }];
    this.CashBreakDownEUR = [{
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
    }];
    this.CashBreakDownBWP = [{
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
    }];
    this.cashTotalZAR = "";
    this.cashTotalZWD = "";
    this.cashTotalUSD = "";
    this.cashTotalEUR = "";
    this.cashTotalBWP = "";
    this.cashTotalGBP = "";
    this.TotalZWD = 0;
    this.TotalUSD = 0;
    this.TotalZAR = 0;
    this.TotalBWP = 0;
    this.TotalGBP = 0;
    this.TotalEUR = 0;

  }

  calculator(){
    this.TotalZWD = 0;
    this.TotalUSD = 0;
    this.TotalZAR = 0;
    this.TotalBWP = 0;
    this.TotalGBP = 0;
    this.TotalEUR = 0;


    for (var i = 0; i < this.itemsList.length; i++) {
        var element = this.itemsList[i];
        if(element.amountZWD){
          this.TotalZWD += parseFloat(element.amountZWD);
        }
        if(element.amountBWP){
          this.TotalBWP += parseFloat(element.amountBWP);
        }
        if(element.amountGBP){
          this.TotalGBP += parseFloat(element.amountGBP);
        }
        if(element.amountZAR){
          this.TotalZAR += parseFloat(element.amountZAR);
        }
        if(element.amountUSD){
          this.TotalUSD += parseFloat(element.amountUSD);
        }
        if(element.amountEUR){
          this.TotalEUR += parseFloat(element.amountEUR);
        }

        if(!element.amountZWD){
          this.TotalZWD += 0;
        }
        if(!element.amountBWP){
          this.TotalBWP += 0;
        }
        if(!element.amountGBP){
          this.TotalGBP += 0;
        }
        if(!element.amountZAR){
          this.TotalZAR += 0;
        }
        if(!element.amountUSD){
          this.TotalUSD += 0;
        }
        if(!element.amountEUR){
          this.TotalEUR += 0;
        }
        // var elementUSD = this.itemsList[i];
        // var elementZAR = this.itemsList[i];
        // var elementBWP = this.itemsList[i];
        // var elementGBP = this.itemsList[i];
        // var elementEUR = this.itemsList[i];

        //console.log(elementUSD.amountUSD);
        // how to add each price and get a total
        // this.TotalZWD += parseFloat(element.amountZWD);
        
        
        
       
        

    }

    //console.log(this.TotalUSD);

}

  changeToggler(){
    if(this.toggler == ""){
      this.toggler = "nav_open";
      //console.log(this.toggler);
    }
    else{
      this.toggler = "";
     //console.log(this.toggler);
    }
  }

  changeToggler2(){
    if(this.toggler == ""){
      this.toggler = "topbar_open";
      //console.log(this.toggler);
    }
    else{
      this.toggler = "";
      //console.log(this.toggler);
    }
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
  let modal = this.modelCtrl.create('CashbdPage',{breakdown:this.CashBreakDown[0],currency:currency});
  modal.onDidDismiss(data => {

  if(data){

   // console.log(data);
    if(currency == 'ZWD'){
      this.CashBreakDownZWD = []
      this.CashBreakDownZWD.push(data);
      this.cashTotalZWD = parseFloat(this.CashBreakDownZWD[0].total).toFixed(2)
    }
    if(currency == 'USD'){
      this.CashBreakDownUSD = []
      this.CashBreakDownUSD.push(data);
      this.cashTotalUSD = parseFloat(this.CashBreakDownUSD[0].total).toFixed(2)
    }
    if(currency == 'ZAR'){
      this.CashBreakDownZAR = []
      this.CashBreakDownZAR.push(data);
      this.cashTotalZAR = parseFloat(this.CashBreakDownZAR[0].total).toFixed(2)
    }
    if(currency == 'BWP'){
      this.CashBreakDownBWP = []
      this.CashBreakDownBWP.push(data);
      this.cashTotalBWP = parseFloat(this.CashBreakDownBWP[0].total).toFixed(2)
    }
    if(currency == 'GBP'){
      this.CashBreakDownGBP = []
      this.CashBreakDownGBP.push(data);
      this.cashTotalGBP = parseFloat(this.CashBreakDownGBP[0].total).toFixed(2)
    }
    if(currency == 'EUR'){
      this.CashBreakDownEUR = []
      this.CashBreakDownEUR.push(data);
      this.cashTotalEUR = parseFloat(this.CashBreakDownEUR[0].total).toFixed(2)
    }
  
   // console.log(this.CashBreakDown);
    //this.calculator();

  }
  });
  modal.present();
}
  itemList(){
    let modal = this.modelCtrl.create('AdditemPage',{sessionID: this.sessionID });
    modal.onDidDismiss(data => {

    if(data){

     //console.log(data.itemaccount);
      this.itemsList.push(data);
      console.log(this.itemsList);
      this.calculator();

    }
    });
    modal.present();
  }
  RemoveLine(selectedItem){
    // var oldarray;//this.itemList
    // oldarray = this.itemList
     this.itemsList.splice(selectedItem,1);
     this.calculator();
    //console.log(this.itemsList)
  }
  EditLine(selectedItem,data){
    let modal = this.modelCtrl.create('EdititemPage',{amountBWP: data.amountBWP,amountZWD: data.amountZWD,amountUSD: data.amountUSD,amountGBP: data.amountGBP,amountEUR: data.amountEUR,amountZAR: data.amountZAR },{cssClass:"my-modal2"});
    modal.onDidDismiss(data => {

    if(data){

     
     this.itemsList[selectedItem].amountBWP = data.amountBWP
     this.itemsList[selectedItem].amountZAR = data.amountZAR
     this.itemsList[selectedItem].amountZWD = data.amountZWD
     this.itemsList[selectedItem].amountUSD = data.amountUSD
     this.itemsList[selectedItem].amountGBP = data.amountGBP
     this.itemsList[selectedItem].amountEUR = data.amountEUR

      // this.itemsList.push(data);
      // console.log(this.itemsList);
      console.log(this.itemsList);
      this.calculator();

    }
    });
    modal.present();
  }
  viewInoives(){
  this.numberOfOpenInoives = [];
  this.count = [];
  this.massages;
    this.restservice.loadInvoicesAllOpen().then((data) =>{
      this.numberOfOpenInoives.push(data);
      this.count = this.numberOfOpenInoives[0];
      this.massages = this.count.length;
      //console.log(data);
     });
    let modal = this.modelCtrl.create('ViewinvoicesPage',{sessionID: this.sessionID,BPCode: this.remittanceData.addid,BPName: this.remittanceData.cardname });
    modal.onDidDismiss(data => {
      this.numberOfOpenInoives = [];
      this.count = [];
      this.massages;
      this.restservice.loadInvoicesAllOpen().then((data) =>{
        this.numberOfOpenInoives.push(data);
        this.count = this.numberOfOpenInoives[0];
        this.massages = this.count.length;
        //console.log(data);
       });
     // console.log(data);
  });
  modal.present();

  }

  payRemittance(){
    // if(this.remittanceData.cardcode && this.remittanceData.cardname){
      let modal = this.modelCtrl.create('InvoicelistPage',{sessionID: this.sessionID,BPCode: this.remittanceData.addid,BPName: this.remittanceData.cardname });
      modal.onDidDismiss(data => {
      if(data){
        //console.log(data);

      }

       // console.log(data);
    });
    modal.present();
    // }else{
    //   this.presentAlert4();
    // }

  }

  async getID(){
    
    let dataID = await this.restservice.getRemittanceID().toPromise();
    //console.log(dataID)
    return dataID.data.one.recordset[0].id+1
   
}
 async addRemittance(){
  this.remittanceID = await this.getID()
  
  // console.log(this.remittanceID)
    this.receiptCount = 0;
    if(this.date && this.duedate && this.remittanceID){
    if(this.BusinessParnter){
      if(this.description){

    if(this.paymentType){
      if(this.paymentType == "Transfer"){
        if(this.reference && this.transferdate){
        
        if(this.itemsList.length == 0){
          this.presentAlert2();
        }else{
          this.remittanceData.date = this.date;
          this.remittanceData.duedate = this.duedate;
          this.remittanceData.description = this.description;
          this.remittanceData.paymentType = this.paymentType;

          this.remittanceData.items = this.itemsList;
          this.remittanceData.totalZWD = this.TotalZWD.toString();
          this.remittanceData.totalUSD = this.TotalUSD.toString();
          this.remittanceData.totalZAR = this.TotalZAR.toString();
          this.remittanceData.totalBWP = this.TotalBWP.toString();
          this.remittanceData.totalGBP = this.TotalGBP.toString();
          this.remittanceData.totalEUR = this.TotalEUR.toString();
          this.remittanceData.transferDate = this.transferdate;
          this.remittanceData.ref = this.reference;
          
          this.remittanceData.receiptID = `T-`+Math.floor(new Date().getTime()/1000);
         
          //console.log(this.remittanceData);
          if(this.remittanceData.totalZWD != "0"){
            this.receiptCount += 1
            this.transactionSessionZWD();

           }
          if(this.remittanceData.totalUSD != "0"){
            this.receiptCount += 1
            this.transactionSessionUSD();

           }


          if(this.remittanceData.totalBWP != "0"){
            this.receiptCount += 1
            this.transactionSessionBWP();

          }
          if(this.remittanceData.totalZAR != "0"){
            this.receiptCount += 1
            this.transactionSessionZAR();

          }
          if(this.remittanceData.totalGBP != "0"){
            this.receiptCount += 1
            this.transactionSessionGBP();

          }
          if(this.remittanceData.totalEUR != "0"){
            this.receiptCount += 1
            this.transactionSessionEUR();

          }
          //this.clearList();
        }
       }else{
        this.presentAlertTranferDetails();
       }
      }
      if(this.paymentType == "Cash"){


                if(this.itemsList.length == 0){
                  this.presentAlert2();
                }else{
                  this.remittanceData.date = this.date;
                  this.remittanceData.duedate = this.duedate;
                  this.remittanceData.description = this.description;
                  this.remittanceData.paymentType = this.paymentType;

                  this.remittanceData.items = this.itemsList;
                  this.remittanceData.cashbreakdownZAR = this.CashBreakDownZAR[0];
                  this.remittanceData.cashbreakdownZWD = this.CashBreakDownZWD[0];
                  this.remittanceData.cashbreakdownUSD = this.CashBreakDownUSD[0];
                  this.remittanceData.cashbreakdownEUR = this.CashBreakDownEUR[0];
                  this.remittanceData.cashbreakdownBWP = this.CashBreakDownBWP[0];
                  this.remittanceData.cashbreakdownGBP = this.CashBreakDownGBP[0];
                  this.remittanceData.totalZWD = this.TotalZWD.toString();
                  this.remittanceData.totalUSD = this.TotalUSD.toString();
                  this.remittanceData.totalZAR = this.TotalZAR.toString();
                  this.remittanceData.totalBWP = this.TotalBWP.toString();
                  this.remittanceData.totalGBP = this.TotalGBP.toString();
                  this.remittanceData.totalEUR = this.TotalEUR.toString();
                  this.remittanceData.receiptID = `C-`+this.remittanceID;

                  if(this.remittanceData.totalZWD != "0"){
                    if(this.CashBreakDownZWD[0].total == null){
                      this.presentAlertNoBreakDown()
                    }else{
                      if(this.remittanceData.totalZWD == this.CashBreakDownZWD[0].total){
                        this.receiptCount += 1
                        this.transactionSessionZWD();
                      }else{
                        this.presentAlertCashTotalNoMatch()
                      }
                    }
                   }

                 if(this.remittanceData.totalUSD != "0"){
                 
                  if(this.CashBreakDownUSD[0].total == null){
                    this.presentAlertNoBreakDown()
                  }else{
                    if(this.remittanceData.totalUSD == this.CashBreakDownUSD[0].total){
                      this.receiptCount += 1
                      this.transactionSessionUSD();
                    }else{
                      this.presentAlertCashTotalNoMatch()
                    }
                  }

                 }

                  if(this.remittanceData.totalBWP != "0"){
                   
                    if(this.CashBreakDownBWP[0].total == null){
                      this.presentAlertNoBreakDown()
                    }else{
                      if(this.remittanceData.totalBWP == this.CashBreakDownBWP[0].total){
                        this.receiptCount += 1
                        this.transactionSessionBWP();
                      }else{
                        this.presentAlertCashTotalNoMatch()
                      }
                    }
                    

                  }
                  if(this.remittanceData.totalZAR != "0"){
                    
                    if(this.CashBreakDownZAR[0].total == null){
                      this.presentAlertNoBreakDown()
                    }else{
                      if(this.remittanceData.totalZAR == this.CashBreakDownZAR[0].total){
                        this.receiptCount += 1
                        this.transactionSessionZAR();
                      }else{
                        this.presentAlertCashTotalNoMatch()
                      }
                    }

                  }
                  if(this.remittanceData.totalGBP != "0"){
                    
                    if(this.CashBreakDownGBP[0].total == null){
                      this.presentAlertNoBreakDown()
                    }else{
                      if(this.remittanceData.totalGBP == this.CashBreakDownGBP[0].total){
                        this.receiptCount += 1
                        this.transactionSessionGBP();
                      }else{
                        this.presentAlertCashTotalNoMatch()
                      }
                    }

                  }
                  if(this.remittanceData.totalEUR != "0"){
                    
                    if(this.CashBreakDownEUR[0].total == null){
                      this.presentAlertNoBreakDown()
                    }else{
                      if(this.remittanceData.totalEUR == this.CashBreakDownEUR[0].total){
                        this.receiptCount += 1
                        this.transactionSessionEUR();
                      }else{
                        this.presentAlertCashTotalNoMatch()
                      }
                    }

                  }


                }
              }

              if(this.paymentType == "Part"){


                if(this.itemsList.length == 0){
                  this.presentAlert2();
                }else{
                  this.remittanceData.date = this.date;
                  this.remittanceData.duedate = this.duedate;
                  this.remittanceData.description = this.description;
                  this.remittanceData.paymentType = this.paymentType;

                  this.remittanceData.items = this.itemsList;
                  this.remittanceData.cashbreakdownZAR = this.CashBreakDownZAR[0];
                  this.remittanceData.cashbreakdownZWD = this.CashBreakDownZWD[0];
                  this.remittanceData.cashbreakdownUSD = this.CashBreakDownUSD[0];
                  this.remittanceData.cashbreakdownEUR = this.CashBreakDownEUR[0];
                  this.remittanceData.cashbreakdownBWP = this.CashBreakDownBWP[0];
                  this.remittanceData.cashbreakdownGBP = this.CashBreakDownGBP[0];
                  this.remittanceData.totalZWD = this.TotalZWD.toString();
                  this.remittanceData.totalUSD = this.TotalUSD.toString();
                  this.remittanceData.totalZAR = this.TotalZAR.toString();
                  this.remittanceData.totalBWP = this.TotalBWP.toString();
                  this.remittanceData.totalGBP = this.TotalGBP.toString();
                  this.remittanceData.totalEUR = this.TotalEUR.toString();

                  if(this.remittanceData.totalZWD != "0"){
                    this.transactionSessionZWD();
  
                   }
  

                 if(this.remittanceData.totalUSD != "0"){
                  this.transactionSessionUSD();

                 }

                  if(this.remittanceData.totalBWP != "0"){
                    this.transactionSessionBWP();

                  }
                  if(this.remittanceData.totalZAR != "0"){
                    this.transactionSessionZAR();

                  }
                  if(this.remittanceData.totalGBP != "0"){
                    this.transactionSessionGBP();

                  }
                  if(this.remittanceData.totalEUR != "0"){
                    this.transactionSessionEUR();

                  }


                }
              }

      if(this.paymentType == "Unknown"){
        if(this.itemsList.length == 0){
          this.presentAlert2();
        }else{
          this.remittanceData.date = this.date;
          this.remittanceData.duedate = this.duedate;
          this.remittanceData.description = this.description;
          this.remittanceData.paymentType = this.paymentType;

          this.remittanceData.items = this.itemsList;
          this.remittanceData.totalZWD = this.TotalZWD.toString();
          this.remittanceData.totalUSD = this.TotalUSD.toString();
          this.remittanceData.totalZAR = this.TotalZAR.toString();
          this.remittanceData.totalBWP = this.TotalBWP.toString();
          this.remittanceData.totalGBP = this.TotalGBP.toString();
          this.remittanceData.totalEUR = this.TotalEUR.toString();
                  
          this.remittanceData.receiptID = `U-`+Math.floor(new Date().getTime()/1000);
          

          if(this.unknownCurrency == "USD" || this.unknownCurrency == "usd"){
            if(this.remittanceData.totalUSD != "0"){
              if(this.remittanceData.totalZWD == "0" && this.remittanceData.totalBWP == "0" && this.remittanceData.totalZAR == "0" && this.remittanceData.totalGBP == "0" && this.remittanceData.totalEUR == "0"){
                if(this.remittanceData.totalUSD < this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalUSD > this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalUSD == this.unknownAmount){
                  this.transactionSessionUnknown();
                }

              }else{
                this.presentAlert6();
              }
            }else{
              this.presentAlert5();
            }
          }

         else if(this.unknownCurrency == "BWP" || this.unknownCurrency == "bwp"){
            if(this.remittanceData.totalBWP != "0"){
              if(this.remittanceData.totalZWD == "0" && this.remittanceData.totalUSD == "0" && this.remittanceData.totalZAR == "0" && this.remittanceData.totalGBP == "0" && this.remittanceData.totalEUR == "0"){
                if(this.remittanceData.totalBWP < this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalBWP > this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalBWP == this.unknownAmount){
                  this.transactionSessionUnknown();
                }
              }else{
                this.presentAlert6();
              }
            }else{
              this.presentAlert5();
            }
          }
          
          else if(this.unknownCurrency == "ZWD" || this.unknownCurrency == "zwd"){
            if(this.remittanceData.totalZWD != "0"){
              if(this.remittanceData.totalZAR == "0" && this.remittanceData.totalBWP == "0" && this.remittanceData.totalUSD == "0" && this.remittanceData.totalGBP == "0" && this.remittanceData.totalEUR == "0"){
                if(this.remittanceData.totalZWD < this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalZWD > this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalZWD == this.unknownAmount){
                  this.transactionSessionUnknown();
                }
              }else{
                this.presentAlert6();
              }
            }else{
              this.presentAlert5();
            }
          }

          else if(this.unknownCurrency == "ZAR" || this.unknownCurrency == "zar"){
            
            if(this.remittanceData.totalZAR != "0"){
              console.log(this.remittanceData);
              if(this.remittanceData.totalZWD == "0" && this.remittanceData.totalBWP == "0" && this.remittanceData.totalUSD == "0" && this.remittanceData.totalGBP == "0" && this.remittanceData.totalEUR == "0"){
                if(this.remittanceData.totalZAR < this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalZAR > this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalZAR == this.unknownAmount){
                  this.transactionSessionUnknown();
                }
              }else{
                this.presentAlert6();
              }
            }else{
              this.presentAlert5();
            }
          }


          else if(this.unknownCurrency == "GBP" || this.unknownCurrency == "gbp"){
            if(this.remittanceData.totalGBP != "0"){
              if(this.remittanceData.totalZWD == "0" && this.remittanceData.totalBWP == "0" && this.remittanceData.totalZAR == "0" && this.remittanceData.totalUSD == "0" && this.remittanceData.totalEUR == "0"){
                if(this.remittanceData.totalGBP < this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalGBP > this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalGBP == this.unknownAmount){
                  this.transactionSessionUnknown();
                }
              }else{
                this.presentAlert6();
              }
            }else{
              this.presentAlert5();
            }
          }

          else if(this.unknownCurrency == "EUR" || this.unknownCurrency == "eur"){
            if(this.remittanceData.totalEUR != "0"){
              if(this.remittanceData.totalZWD == "0" && this.remittanceData.totalBWP == "0" && this.remittanceData.totalZAR == "0" && this.remittanceData.totalGBP == "0" && this.remittanceData.totalUSD == "0"){
                if(this.remittanceData.totalEUR < this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalEUR > this.unknownAmount){
                  this.presentAlert7();
                }
                if(this.remittanceData.totalEUR == this.unknownAmount){
                  this.transactionSessionUnknown();
                }
              }else{
                this.presentAlert6();
              }
            }else{
              this.presentAlert5();
            }
          }
          else{
            this.presentAlertUnknownRemitance();
          }

          //this.clearList();
        }

      }


      if(this.paymentType == "Late"){
        if(this.itemsList.length == 0){
          this.presentAlert2();
        }else{
          this.remittanceData.date = this.date;
          this.remittanceData.duedate = this.duedate;
          this.remittanceData.description = this.description;
          this.remittanceData.paymentType = this.paymentType;

          this.remittanceData.items = this.itemsList;
          this.remittanceData.totalZWD = this.TotalZWD.toString();
          this.remittanceData.totalUSD = this.TotalUSD.toString();
          this.remittanceData.totalZAR = this.TotalZAR.toString();
          this.remittanceData.totalBWP = this.TotalBWP.toString();
          this.remittanceData.totalGBP = this.TotalGBP.toString();
          this.remittanceData.totalEUR = this.TotalEUR.toString();
          
          this.remittanceData.receiptID = `P-`+Math.floor(new Date().getTime()/1000);
          //console.log(this.remittanceData);

          if(this.remittanceData.totalZWD == "0" && this.remittanceData.totalUSD == "0" && this.remittanceData.totalBWP == "0" && this.remittanceData.totalZAR == "0" && this.remittanceData.totalGBP == "0" && this.remittanceData.totalEUR == "0"){
                this.presentAlert5();
          }else{
            if(this.remittanceData.totalZWD != "0"){

              this.transactionSessionLate('ZWD');
            }

            if(this.remittanceData.totalUSD != "0"){

              this.transactionSessionLate('USD');
            }


        if(this.remittanceData.totalBWP != "0"){

              this.transactionSessionLate('BWP');

        }


        if(this.remittanceData.totalZAR != "0"){

              this.transactionSessionLate('ZAR');

        }


        if(this.remittanceData.totalGBP != "0"){

              this.transactionSessionLate('GBP');

          }


        if(this.remittanceData.totalEUR != "0"){

              this.transactionSessionLate('EUR');
        }
          }
          //this.clearList();
        }

      }

    }else{
      this.presentAlert();
    }
  }else{
    this.presentAlertDescription();    
  }
  }else{
    this.presentAlertBP();
  }
  }else{
    this.presentAlertDate();
  }
    //console.log(this.complited);
  }


  transactionSessionUnknown(){
    
    //console.log(this.remittanceData.owner);
    //console.log(this.LoginService);
      this.restservice.loadAccountCodes('Internal Holdings',this.unknownCurrency).then((res:any) => {
        this.accountCode2 = res[0].accountCode;

       if(this.accountCode2){
        //console.log(this.accountCode);
        //console.log(this.accountCode2);


    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';



    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue;


      try{
        if(results != "Unable to connect with the specified username and or password"){
         this.complited = this.sapservice.addInvoiceUnknown(results,this.remittanceData,this.accountCode2,this.unknownCurrency,this.unknownID);
         //console.log(results);
        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

       });
       }

      });

  }


  transactionSessionLate(currency){
    //console.log(this.remittanceData.owner);
    //console.log(this.LoginService);
      this.restservice.loadAccountCodes('Internal Holdings',currency).then((res:any) => {
        this.accountCode2 = res[0].accountCode;

       if(this.accountCode2){
        //console.log(this.accountCode);
        //console.log(this.accountCode2);


    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';



    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue;


      try{
        if(results != "Unable to connect with the specified username and or password"){
         this.complited = this.sapservice.addInvoiceLate(results,this.remittanceData,this.accountCode2,currency);
         //console.log(results);
        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

       });
       }

      });

  }

  transactionSessionZWD(){
    this.restservice.loadAccountCodes('External Bank','ZWD').then((res:any) => {
      this.accountCodeZWD = res[0].accountCode;
      this.restservice.loadAccountCodes('Internal Holdings','ZWD').then((res:any) => {
        this.accountCodeZWD2 = res[0].accountCode;

        if(this.accountCodeZWD && this.accountCodeZWD2){

         // console.log(this.accountCodeZAR);
          //console.log(this.accountCodeZAR2);

    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue
      console.log(results);
      try{
        if(results != "Unable to connect with the specified username and or password"){
         this.complited = this.sapservice.addInvoiceZWD(results,this.remittanceData,this.accountCodeZWD,this.accountCodeZWD2,this.receiptCount);

        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

    });
        }

      });

    });


   }

  transactionSessionUSD(){
    this.restservice.loadAccountCodes('External Bank','USD').then((res:any) => {
      this.accountCode = res[0].accountCode;

      this.restservice.loadAccountCodes('Internal Holdings','USD').then((res:any) => {
        this.accountCode2 = res[0].accountCode;

       if(this.accountCode && this.accountCode2){
       // console.log(this.accountCode);
      //  console.log(this.accountCode2);


    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue;

      //console.log(results);
      try{
        if(results != "Unable to connect with the specified username and or password"){
          this.complited = this.sapservice.addInvoice(results,this.remittanceData,this.accountCode,this.accountCode2,this.receiptCount);

        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

    });
       }

      });


    });


   }

   transactionSessionBWP(){
    this.restservice.loadAccountCodes('External Bank','BWP').then((res:any) => {
      this.accountCodeBWP = res[0].accountCode;
      this.restservice.loadAccountCodes('Internal Holdings','BWP').then((res:any) => {
        this.accountCodeBWP2 = res[0].accountCode;

        if(this.accountCodeBWP && this.accountCodeBWP2){

    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue
      console.log(results);
      try{
        if(results != "Unable to connect with the specified username and or password"){
          this.complited = this.sapservice.addInvoiceBWP(results,this.remittanceData,this.accountCodeBWP,this.accountCodeBWP2,this.receiptCount);

        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

    });

        }
      });

    });


   }

   transactionSessionZAR(){
    this.restservice.loadAccountCodes('External Bank','ZAR').then((res:any) => {
      this.accountCodeZAR = res[0].accountCode;
      this.restservice.loadAccountCodes('Internal Holdings','ZAR').then((res:any) => {
        this.accountCodeZAR2 = res[0].accountCode;

        if(this.accountCodeZAR && this.accountCodeZAR2){

         // console.log(this.accountCodeZAR);
          //console.log(this.accountCodeZAR2);

    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue
      console.log(results);
      try{
        if(results != "Unable to connect with the specified username and or password"){
          this.complited = this.sapservice.addInvoiceZAR(results,this.remittanceData,this.accountCodeZAR,this.accountCodeZAR2,this.receiptCount);

        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

    });
        }

      });

    });


   }

   transactionSessionGBP(){
    this.restservice.loadAccountCodes('External Bank','GBP').then((res:any) => {
      this.accountCodeGBP = res[0].accountCode;
      this.restservice.loadAccountCodes('Internal Holdings','GBP').then((res:any) => {
        this.accountCodeGBP2 = res[0].accountCode;
          if(this.accountCodeGBP && this.accountCodeGBP2){

      let headers = new Headers();

      let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
      '<soapenv:Header/>'+
      '<soapenv:Body>'+
         '<log:Login>'+
            '<!--Optional:-->'+
            '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
            '<!--Optional:-->'+
            '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
            '<!--Optional:-->'+
            '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
            '<!--Optional:-->'+
            '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
            '<!--Optional:-->'+
            '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
            '<!--Optional:-->'+
            '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
            '<!--Optional:-->'+
            '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
            '<!--Optional:-->'+
            '<log:Language>ln_English</log:Language>'+
            '<!--Optional:-->'+
            '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
         '</log:Login>'+
      '</soapenv:Body>'+
   '</soapenv:Envelope>';

      this.http.post(this.url,body,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");
        var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue
        console.log(results);
        try{
          if(results != "Unable to connect with the specified username and or password"){
            this.complited = this.sapservice.addInvoiceGBP(results,this.remittanceData,this.accountCodeGBP,this.accountCodeGBP2,this.receiptCount);

          }else{
            this.presentAlert();
          }
        }catch(e){
          this.presentAlertError(e);
        }

      });

          }

      });


    });

  }

   transactionSessionEUR(){
    this.restservice.loadAccountCodes('External Bank','EUR').then((res:any) => {
      this.accountCodeEUR = res[0].accountCode;
      this.restservice.loadAccountCodes('Internal Holdings','EUR').then((res:any) => {
        this.accountCodeEUR2 = res[0].accountCode;
          if(this.accountCodeEUR && this.accountCodeEUR2){

    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>'+this.db+'</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.cred.username+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.cred.password+'</log:CompanyPassword>'+
          '<!--Optional:-->'+
          '<log:Language>ln_English</log:Language>'+
          '<!--Optional:-->'+
          '<log:LicenseServer>10.0.0.36:30000</log:LicenseServer>'+
       '</log:Login>'+
    '</soapenv:Body>'+
 '</soapenv:Envelope>';


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue
      console.log(results);
      try{
        if(results != "Unable to connect with the specified username and or password"){
          this.complited = this.sapservice.addInvoiceEUR(results,this.remittanceData,this.accountCodeEUR,this.accountCodeEUR2,this.receiptCount);

        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlertError(e);
      }

    });

          }

      });

    });


   }


  presentAlertError(error) {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  unkownList(){
    if(this.remittanceData.cardcode && this.remittanceData.cardname){
      let modal = this.modelCtrl.create('UnknownlistPage',{sessionID: this.sessionID,BPCode: this.remittanceData.addid,BPName: this.remittanceData.cardname });
      modal.onDidDismiss(data => {
      if(data){
        //console.log(data);
        this.unknownAmount = data.amount;
        this.unknownCurrency = data.currency.toUpperCase();
        this.remittanceData.docentry = data.docentry;
        this.unknownID = data.id;
        this.UnknownAccount = 'Unpresented Amount is : '+data.currency+' '+data.amount;
      }

       // console.log(data);
    });
    modal.present();
    }else{
      this.presentAlert4();
    }

  }

  customerList(name){
    let modal = this.modelCtrl.create('CustomersPage',{sessionID: this.sessionID,BusinessParnterName: name });
    modal.onDidDismiss(data => {
    if(data){
      this.remittanceData.cardname = data.BPname;
      this.remittanceData.cardcode = data.BPCode;
      this.remittanceData.firstName = data.FirstName;
      this.remittanceData.lastName = data.LastName;
      this.remittanceData.email = data.email;
      this.BusinessParnter = data.BPname;
      this.remittanceData.addid = data.BPid;
    }

     // console.log(data);
  });
  modal.present();
  }

  navigator(page){
    // if(page == 'Remittance'){
    //  // this.navCtrl.setRoot('HomePage',{sessionID:this.sessionID});
    //   page = null;
    // }
    if(page == 'CashHandOver'){
      this.navCtrl.push('LatePage',{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
   
    if(page == 'Reports'){
      this.navCtrl.push('ReportsPage',{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading Account Data..."
    });
    this.loader.dismiss();
  }



  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please select a payment type, either Cash or Tranfer',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlertDate() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please enter date and due date',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlertBP() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please enter or select a district or province',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlertDescription(){
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please enter a document description',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlertUnknownRemitance(){
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please select at least one unknown payment to complete remittance.',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please select at least one item to post',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Please input transfer Date & Bank Reference ID',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlertCashTotalNoMatch() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'Cash break down and remittance currencies or totals do not match, please check and try again.',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlertNoBreakDown() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: 'There is no Cash break down , please click the green cash breakdown button and link it to the remittance.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert4() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Error',
      subTitle: 'Please select a Business Partner before choosing this option !!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert5() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Error',
      subTitle: 'You can not add a blank remittance, please select at least one item!!',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  presentAlertTranferDetails(){
    let alert = this.alertCtrl.create({
      title: 'Remittance Error',
      subTitle: 'Please enter transfer reference and transfer date.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert6() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Error',
      subTitle: 'You can not add an item with a different currency from the selected unknown payment, please clear item list and input the relevant currency only !!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert7() {
    let alert = this.alertCtrl.create({
      title: 'Remittance Error',
      subTitle: 'Sorry but your payment amount and your remittance amount do not match, please verify your remittance again !!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentPopover(myEvent) {
    let popover = this.popover.create(PopmenuComponent);
    popover.present({
      ev:myEvent
    });

    popover.onDidDismiss(popoverData => {
      console.log(popoverData.item);
      if(popoverData.item == "Account Determination"){
        let modal = this.modelCtrl.create('AccountdPage');
           modal.onDidDismiss(data => {


         });
         modal.present();
      }
      if(popoverData.item == "User Settings"){
        let modal = this.modelCtrl.create('UsersPage');
           modal.onDidDismiss(data => {


         });
         modal.present();
      }
      if(popoverData.item == "Logout"){
        this.navCtrl.setRoot(LoginPage);
      }
    });

  }

}
