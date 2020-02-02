import { RestapiserviceProvider } from './../restapiservice/restapiservice';
import { GlobleProvider } from './../globle/globle';

import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import { parseDate } from 'ionic-angular/util/datetime-util';
import {App} from "ionic-angular";
import { Loading, AlertController, LoadingController } from 'ionic-angular';


/*
  Generated class for the SapservicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SapservicesProvider {
  loader: Loading;
  invoiceData = [];

  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",

  ];
  receiptCounter;
  receiptCounterLate = 0;
  url = "http://10.0.0.36/B1WS/Service.asmx";
  myDate = new Date();
  datestamp = this.month[this.myDate.getMonth()]+' '+this.myDate.getDate().toString()+' '+this.myDate.getFullYear().toString()+' - '+this.myDate.getHours().toString()+':'+this.myDate.getMinutes().toString();
  datestampu = this.month[this.myDate.getMonth()]+' '+this.myDate.getDate().toString()+' '+this.myDate.getFullYear().toString();

  constructor(public loadingCtrl: LoadingController,public restservice:RestapiserviceProvider, public app: App,public global:GlobleProvider, public http: Http,public alertCtrl: AlertController) {
    console.log('Hello SapservicesProvider Provider');
    
  }
//add invoice then journal no payment

presentLoading() {
  this.loader = this.loadingCtrl.create({
    content: "Processing Remittance...",
    enableBackdropDismiss: true,
    duration: 5000
  });
  this.loader.present();
 
}


addInvoiceLate(sessionid,docdata,accountCode2,currency){
  this.presentLoading();
  var bpcode;
  if(currency == "ZWD" || currency == "zwd"){
    bpcode = docdata.addid+"_001"
    this.receiptCounterLate += 1
  }
  if(currency == "USD" || currency == "usd"){
    bpcode = docdata.addid+"_001"
    this.receiptCounterLate += 1
  }
  if(currency == "BWP" || currency == "bwp"){
    bpcode = docdata.addid+"_001"
    this.receiptCounterLate += 1
  }
  if(currency == "ZAR" || currency == "zar"){
    bpcode = docdata.addid+"_001"
    this.receiptCounterLate += 1
  }
  if(currency == "GBP" || currency == "gbp"){
    bpcode = docdata.addid+"_001"
    this.receiptCounterLate += 1
  }
  if(currency == "EUR" || currency == "eur"){
    bpcode = docdata.addid+"_001"
    this.receiptCounterLate += 1
  }
  let newdate = this.formateDate(docdata.date);
  let newduedate = this.formateDate(docdata.duedate);
  var sXML;
  //console.log(newdate);
  //console.log(newduedate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<env:Header>'+
   '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
   '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
   '<BOM>'+
    '<BO>'+
     '<AdmInfo>'+
      '<Object>oInvoices</Object>'+
     '</AdmInfo>'+
     '<Documents>'+
      '<row>'+
       '<DocDate>'+newdate+'</DocDate>'+
       '<dis:DocCurrency>'+currency+'</dis:DocCurrency>'+
       '<DocDueDate>'+newduedate+'</DocDueDate>'+
       '<CardCode>'+bpcode+'</CardCode>'+
       '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
       '<Comments>'+docdata.description+'</Comments>'+
       '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
       '<DocType>dDocument_Items</DocType>'+
      '</row>'+
     '</Documents>'+
     '<Document_Lines></Document_Lines>'+
    '</BO>'+
   '</BOM>'+
   '</dis:AddObject>'+
  '</env:Body>'+
 '</env:Envelope>';

 if(currency == "USD" || currency == "usb"){
  let mainbody = this.createRows(docdata,body);
  sXML = new XMLSerializer().serializeToString(mainbody);
}
if(currency == "ZWD" || currency == "zwd"){
  let mainbody = this.createRowsINZWD(docdata,body);
  sXML = new XMLSerializer().serializeToString(mainbody);
}
if(currency == "BWP" || currency == "bwp"){
  let mainbody = this.createRowsINBWP(docdata,body);
  sXML = new XMLSerializer().serializeToString(mainbody);
}
if(currency == "ZAR" || currency == "zar"){
  let mainbody = this.createRowsINZAR(docdata,body);
  sXML = new XMLSerializer().serializeToString(mainbody);
}
if(currency == "GBP" || currency == "gbp"){
  let mainbody = this.createRowsINGBP(docdata,body);
  sXML = new XMLSerializer().serializeToString(mainbody);
}
if(currency == "EUR" || currency == "eur"){
  let mainbody = this.createRowsINEUR(docdata,body);
  sXML = new XMLSerializer().serializeToString(mainbody);
}

 //let mainbody = this.createRows(docdata,body);
// var sXML = new XMLSerializer().serializeToString(mainbody);
 //console.log(sXML);

  this.http.post(this.url,sXML,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
     // console.log(results);
     if(currency == "USD" || currency == "usd"){
       let amount  = docdata.totalUSD;
       this.restservice.addInvoice(docdata,results,amount,currency,bpcode).then((newdata) =>{

         let resData = newdata;
         //console.log(newdata);
      this.addJournalLate(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,newdata);

       });
      }

     if(currency == "BWP" || currency == "bwp"){
      let amount  = docdata.totalBWP;
      this.restservice.addInvoice(docdata,results,amount,currency,bpcode).then((newdata) =>{

        let resData = newdata;
        //console.log(newdata);
      this.addJournalLate(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,newdata);

      });
     }
    if(currency == "ZAR" || currency == "zar"){
      let amount  = docdata.totalZAR;
      this.restservice.addInvoice(docdata,results,amount,currency,bpcode).then((newdata) =>{

        let resData = newdata;
        //console.log(newdata);
       this.addJournalLate(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,newdata);

      });
    }
    if(currency == "ZWD" || currency == "zwd"){
      let amount  = docdata.totalZWD;
      this.restservice.addInvoice(docdata,results,amount,currency,bpcode).then((newdata) =>{

        let resData = newdata;
       // console.log(newdata);
       this.addJournalLate(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,newdata);

      });
    }
    if(currency == "GBP" || currency == "gbp"){
      let amount  = docdata.totalGBP;
      this.restservice.addInvoice(docdata,results,amount,currency,bpcode).then((newdata) =>{

        let resData = newdata;
        //console.log(newdata);
       this.addJournalLate(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,newdata);

      });
     }
    if(currency == "EUR" || currency == "eur"){
      let amount  = docdata.totalEUR;
      this.restservice.addInvoice(docdata,results,amount,currency,bpcode).then((newdata) =>{

        let resData = newdata;
        //console.log(newdata);
       this.addJournalLate(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,newdata);

      });
     }

   }catch{
    var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
   // console.log(results);
     this.errorAlert(error);
    }

  });
}

//add invoice then journal no payment
  addInvoiceUnknown(sessionid,docdata,accountCode2,currency,id){
    this.presentLoading();
    var bpcode;
    if(currency == "ZWD" || currency == "zwd"){
      
      bpcode = docdata.addid+"_001"
    }
    if(currency == "USD" || currency == "usd"){
      bpcode = docdata.addid+"_001"
    }
    if(currency == "BWP" || currency == "bwp"){
      bpcode = docdata.addid+"_001"
    }
    if(currency == "ZAR" || currency == "zar"){
      bpcode = docdata.addid+"_001"
    }
    if(currency == "GBP" || currency == "gbp"){
      bpcode = docdata.addid+"_001"
    }
    if(currency == "EUR" || currency == "eur"){
      bpcode = docdata.addid+"_001"
    }
    let newdate = this.formateDate(docdata.date);
    let newduedate = this.formateDate(docdata.duedate);
    var sXML;
    //console.log(newdate);
    //console.log(newduedate);
    let headers = new Headers();

    let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
    '</env:Header>'+
    '<env:Body>'+
     '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
     '<BOM>'+
      '<BO>'+
       '<AdmInfo>'+
        '<Object>oInvoices</Object>'+
       '</AdmInfo>'+
       '<Documents>'+
        '<row>'+
         '<DocDate>'+newdate+'</DocDate>'+
         '<DocDueDate>'+newduedate+'</DocDueDate>'+
         '<dis:DocCurrency>'+currency+'</dis:DocCurrency>'+
         '<CardCode>'+bpcode+'</CardCode>'+         
         '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
         '<Comments>'+docdata.description+'</Comments>'+
         '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
         '<DocType>dDocument_Items</DocType>'+
        '</row>'+
       '</Documents>'+
       '<Document_Lines></Document_Lines>'+
      '</BO>'+
     '</BOM>'+
     '</dis:AddObject>'+
    '</env:Body>'+
   '</env:Envelope>';

   if(currency == "USD"){
    let mainbody = this.createRows(docdata,body);
    sXML = new XMLSerializer().serializeToString(mainbody);
  }
  if(currency == "ZWD"){
    let mainbody = this.createRowsINZWD(docdata,body);
    sXML = new XMLSerializer().serializeToString(mainbody);
  }
  if(currency == "BWP"){
    let mainbody = this.createRowsINBWP(docdata,body);
    sXML = new XMLSerializer().serializeToString(mainbody);
  }
  if(currency == "ZAR"){
    let mainbody = this.createRowsINZAR(docdata,body);
    sXML = new XMLSerializer().serializeToString(mainbody);
  }
  if(currency == "GBP"){
    let mainbody = this.createRowsINGBP(docdata,body);
    sXML = new XMLSerializer().serializeToString(mainbody);
  }
  if(currency == "EUR"){
    let mainbody = this.createRowsINEUR(docdata,body);
    sXML = new XMLSerializer().serializeToString(mainbody);
  }

   //let mainbody = this.createRows(docdata,body);
  // var sXML = new XMLSerializer().serializeToString(mainbody);
   console.log(sXML);

    this.http.post(this.url,sXML,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
        var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
       // console.log(results);
       if(currency == "ZWD"){
        let amount  = docdata.totalZWD;
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: results,payment:docdata.docentry,journal:results,docdata:docdata,sessionID:sessionid});
        this.restservice.updateAccountState(id);
       //this.addJournalUnknown(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,id);
      }
       if(currency == "USD"){
         let amount  = docdata.totalUSD;
         let nav = this.app.getActiveNav();
         this.loader.dismiss();
         nav.push("PrintPage",{invoice: results,payment:docdata.docentry,journal:results,docdata:docdata,sessionID:sessionid});
         this.restservice.updateAccountState(id);
        //this.addJournalUnknown(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,id);
       }
       if(currency == "BWP"){
        let amount  = docdata.totalBWP;
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: results,payment:docdata.docentry,journal:results,docdata:docdata,sessionID:sessionid});
        this.restservice.updateAccountState(id);
        //this.addJournalUnknown(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,id);
      }
      if(currency == "ZAR"){
        let amount  = docdata.totalZAR;
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: results,payment:docdata.docentry,journal:results,docdata:docdata,sessionID:sessionid});
        this.restservice.updateAccountState(id);
        //this.addJournalUnknown(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,id);
      }
      if(currency == "GBP"){
        let amount  = docdata.totalGBP;
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: results,payment:docdata.docentry,journal:results,docdata:docdata,sessionID:sessionid});
        this.restservice.updateAccountState(id);
       // this.addJournalUnknown(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,id);
      }
      if(currency == "EUR"){
        let amount  = docdata.totalEUR;
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: results,payment:docdata.docentry,journal:results,docdata:docdata,sessionID:sessionid});
        this.restservice.updateAccountState(id);
        //this.addJournalUnknown(sessionid,docdata,docdata.docentry,results,accountCode2,amount,currency,id);
      }

     }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }

    });
  }
//USD Invoice Creator
  addInvoice(sessionid,docdata,accountCode,accountCode2,receiptCounter){
    this.receiptCounter = receiptCounter;
    this.presentLoading();
    let newdate = this.formateDate(docdata.date);
    let newduedate = this.formateDate(docdata.duedate);

   // console.log(newdate);
    //console.log(newduedate);
    let rowData  = ''
    docdata.items.forEach(element => {
      if(element.amountUSD){
        rowData += '<row><ItemCode>'+element.itemcode+'</ItemCode><Quantity>1</Quantity><dis:LineTotal>'+element.amountUSD+'</dis:LineTotal></row>';
      }
    });
    let headers = new Headers();

    let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
    '</env:Header>'+
    '<env:Body>'+
     '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
     '<BOM>'+
      '<BO>'+
       '<AdmInfo>'+
        '<Object>oInvoices</Object>'+
       '</AdmInfo>'+
       '<Documents>'+
        '<row>'+
         '<DocDate>'+newdate+'</DocDate>'+
         '<DocDueDate>'+newduedate+'</DocDueDate>'+
         '<CardCode>'+docdata.cardcode+'</CardCode>'+
         '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
         '<dis:DocCurrency>USD</dis:DocCurrency>'+
         '<Comments>'+docdata.description+'</Comments>'+
         '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
         '<DocType>dDocument_Items</DocType>'+
        '</row>'+
       '</Documents>'+
       '<Document_Lines>'+rowData+'</Document_Lines>'+
      '</BO>'+
     '</BOM>'+
     '</dis:AddObject>'+
    '</env:Body>'+
   '</env:Envelope>';

  //  let mainbody = this.createRows(docdata,body);
  //  var sXML = new XMLSerializer().serializeToString(mainbody);
  // console.log(sXML);

    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
        var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
       // console.log(results);

        this.payInvoice(sessionid,results,docdata,newdate,newduedate,accountCode,accountCode2);
     }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }

    });
  }

  //BWP Invoice Creator
  addInvoiceBWP(sessionid,docdata,accountCode,accountCode2,receiptCounter){
    this.receiptCounter = receiptCounter
    this.presentLoading();
    let newdate = this.formateDate(docdata.date);
    let newduedate = this.formateDate(docdata.duedate);

    //console.log(newdate);
    //console.log(newduedate);
    let rowData  = ''
    docdata.items.forEach(element => {
      if(element.amountBWP){
        rowData += '<row><ItemCode>'+element.itemcode+'</ItemCode><Quantity>1</Quantity><dis:LineTotal>'+element.amountBWP+'</dis:LineTotal></row>';
      }
    });
    let headers = new Headers();

    let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
    '</env:Header>'+
    '<env:Body>'+
     '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
     '<BOM>'+
      '<BO>'+
       '<AdmInfo>'+
        '<Object>oInvoices</Object>'+
       '</AdmInfo>'+
       '<Documents>'+
        '<row>'+
         '<DocDate>'+newdate+'</DocDate>'+
         '<DocDueDate>'+newduedate+'</DocDueDate>'+
         '<dis:DocCurrency>BWP</dis:DocCurrency>'+
         '<CardCode>'+docdata.addid+'_001</CardCode>'+
         '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
         '<Comments>'+docdata.description+'</Comments>'+
         '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
         '<DocType>dDocument_Items</DocType>'+
        '</row>'+
       '</Documents>'+
       '<Document_Lines>'+rowData+'</Document_Lines>'+
      '</BO>'+
     '</BOM>'+
     '</dis:AddObject>'+
    '</env:Body>'+
   '</env:Envelope>';

  //  let mainbody = this.createRowsINBWP(docdata,body);
  //  var sXML = new XMLSerializer().serializeToString(mainbody);
   //console.log(sXML);

    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
        var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
       // console.log(results);
        this.payInvoiceBWP(sessionid,results,docdata,newdate,newduedate,accountCode,accountCode2);
     }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     //console.log(results);
       this.errorAlert(error);
      }

    });
  }

    //ZAR Invoice Creator
  addInvoiceZAR(sessionid,docdata,accountCode,accountCode2,receiptCounter){
    this.receiptCounter = receiptCounter
    this.presentLoading();
      let newdate = this.formateDate(docdata.date);
      let newduedate = this.formateDate(docdata.duedate);

      //console.log(newdate);
      //console.log(docdata);
      let rowData  = ''
    docdata.items.forEach(element => {
      if(element.amountZAR){
        rowData += '<row><ItemCode>'+element.itemcode+'</ItemCode><Quantity>1</Quantity><dis:LineTotal>'+element.amountZAR+'</dis:LineTotal></row>';
      }
    });
      let headers = new Headers();

      let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
      '<env:Header>'+
       '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
       '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
       '<BOM>'+
        '<BO>'+
         '<AdmInfo>'+
          '<Object>oInvoices</Object>'+
         '</AdmInfo>'+
         '<Documents>'+
          '<row>'+
           '<DocDate>'+newdate+'</DocDate>'+
           '<DocDueDate>'+newduedate+'</DocDueDate>'+
           '<dis:DocCurrency>ZAR</dis:DocCurrency>'+
           '<CardCode>'+docdata.addid+'_001</CardCode>'+
           '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
           '<Comments>'+docdata.description+'</Comments>'+
           '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
           '<DocType>dDocument_Items</DocType>'+
          '</row>'+
         '</Documents>'+
         '<Document_Lines>'+rowData+'</Document_Lines>'+
        '</BO>'+
       '</BOM>'+
       '</dis:AddObject>'+
      '</env:Body>'+
     '</env:Envelope>';

    //  let mainbody = this.createRowsINZAR(docdata,body);
    //  var sXML = new XMLSerializer().serializeToString(mainbody);
     //console.log(sXML);

      this.http.post(this.url,body,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {
        //console.log(data);
        //console.log(parseFloat(docdata.date));
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");
        try{
          var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
          console.log(results);
          this.payInvoiceZAR(sessionid,results,docdata,newdate,newduedate,accountCode,accountCode2);
       }catch{
        var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       // console.log(results);
         this.errorAlert(error);
        }

      });
    }

 //ZAR Invoice Creator
 addInvoiceZWD(sessionid,docdata,accountCode,accountCode2,receiptCounter){
   this.receiptCounter = receiptCounter
  this.presentLoading();
  let newdate = this.formateDate(docdata.date);
  let newduedate = this.formateDate(docdata.duedate);

  //console.log(newdate);
  //console.log(docdata);
  let rowData  = ''
  docdata.items.forEach(element => {
    if(element.amountZWD){
      rowData += '<row><ItemCode>'+element.itemcode+'</ItemCode><Quantity>1</Quantity><dis:LineTotal>'+element.amountZWD+'</dis:LineTotal></row>';
    }
  });
  
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
  '<env:Header>'+
   '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
   '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
   '<BOM>'+
    '<BO>'+
     '<AdmInfo>'+
      '<Object>oInvoices</Object>'+
     '</AdmInfo>'+
     '<Documents>'+
      '<row>'+
       '<DocDate>'+newdate+'</DocDate>'+
       '<DocDueDate>'+newduedate+'</DocDueDate>'+
       '<CardCode>'+docdata.addid+'_001</CardCode>'+
       '<dis:DocCurrency>ZWD</dis:DocCurrency>'+
       '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
       '<Comments>'+docdata.description+'</Comments>'+
       '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
       '<DocType>dDocument_Items</DocType>'+
      '</row>'+
     '</Documents>'+
     '<Document_Lines>'+rowData+'</Document_Lines>'+
    '</BO>'+
   '</BOM>'+
   '</dis:AddObject>'+
  '</env:Body>'+
 '</env:Envelope>';

 //let mainbody = this.createRowsINZWD(docdata,body);
 //var sXML = new XMLSerializer().serializeToString(body);
 //console.log(sXML);

  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
   // console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      this.payInvoiceZWD(sessionid,results,docdata,newdate,newduedate,accountCode,accountCode2);
   }catch{
    var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
   // console.log(results);
     this.errorAlert(error);
    }

  });
}


  //GBP Invoice Creator
  addInvoiceGBP(sessionid,docdata,accountCode,accountCode2,receiptCounter){
    this.receiptCounter = receiptCounter
    this.presentLoading();
    let newdate = this.formateDate(docdata.date);
    let newduedate = this.formateDate(docdata.duedate);

    //console.log(newdate);
    //console.log(newduedate);
    let rowData  = ''
    docdata.items.forEach(element => {
      if(element.amountGBP){
        rowData += '<row><ItemCode>'+element.itemcode+'</ItemCode><Quantity>1</Quantity><dis:LineTotal>'+element.amountGBP+'</dis:LineTotal></row>';
      }
    });
    let headers = new Headers();

    let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
    '</env:Header>'+
    '<env:Body>'+
     '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
     '<BOM>'+
      '<BO>'+
       '<AdmInfo>'+
        '<Object>oInvoices</Object>'+
       '</AdmInfo>'+
       '<Documents>'+
        '<row>'+
         '<DocDate>'+newdate+'</DocDate>'+
         '<DocDueDate>'+newduedate+'</DocDueDate>'+
         '<dis:DocCurrency>GBP</dis:DocCurrency>'+
         '<CardCode>'+docdata.addid+'_001</CardCode>'+
         '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
         '<Comments>'+docdata.description+'</Comments>'+
         '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
         '<DocType>dDocument_Items</DocType>'+
        '</row>'+
       '</Documents>'+
       '<Document_Lines>'+rowData+'</Document_Lines>'+
      '</BO>'+
     '</BOM>'+
     '</dis:AddObject>'+
    '</env:Body>'+
   '</env:Envelope>';

  //  let mainbody = this.createRowsINGBP(docdata,body);
  //  var sXML = new XMLSerializer().serializeToString(mainbody);
   //console.log(sXML);

    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
     // console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
        var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
       // console.log(results);
        this.payInvoiceGBP(sessionid,results,docdata,newdate,newduedate,accountCode,accountCode2);
     }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }

    });
  }

    //BWP Invoice Creator
  addInvoiceEUR(sessionid,docdata,accountCode,accountCode2,receiptCounter){
    this.receiptCounter = receiptCounter
    this.presentLoading();
      let newdate = this.formateDate(docdata.date);
      let newduedate = this.formateDate(docdata.duedate);

      //console.log(newdate);
      //console.log(newduedate);
      let rowData  = ''
    docdata.items.forEach(element => {
      if(element.amountEUR){
        rowData += '<row><ItemCode>'+element.itemcode+'</ItemCode><Quantity>1</Quantity><dis:LineTotal>'+element.amountEUR+'</dis:LineTotal></row>';
      }
    });
      let headers = new Headers();

      let body = '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
      '<env:Header>'+
       '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
       '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add invoice">'+
       '<BOM>'+
        '<BO>'+
         '<AdmInfo>'+
          '<Object>oInvoices</Object>'+
         '</AdmInfo>'+
         '<Documents>'+
          '<row>'+
           '<DocDate>'+newdate+'</DocDate>'+
           '<DocDueDate>'+newduedate+'</DocDueDate>'+
           '<dis:DocCurrency>EUR</dis:DocCurrency>'+
           '<CardCode>'+docdata.addid+'_001</CardCode>'+
           '<dis:JournalMemo>'+docdata.description+'</dis:JournalMemo>'+
           '<Comments>'+docdata.description+'</Comments>'+
           '<dis:DocumentsOwner>'+docdata.owner+'</dis:DocumentsOwner>'+
           '<DocType>dDocument_Items</DocType>'+
          '</row>'+
         '</Documents>'+
         '<Document_Lines>'+rowData+'</Document_Lines>'+
        '</BO>'+
       '</BOM>'+
       '</dis:AddObject>'+
      '</env:Body>'+
     '</env:Envelope>';

    //  let mainbody = this.createRowsINEUR(docdata,body);
    //  var sXML = new XMLSerializer().serializeToString(mainbody);
     //console.log(sXML);

      this.http.post(this.url,body,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {
       // console.log(data);
        //console.log(parseFloat(docdata.date));
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");
        try{
          var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
         // console.log(results);
          this.payInvoiceEUR(sessionid,results,docdata,newdate,newduedate,accountCode,accountCode2);
       }catch{
        var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       // console.log(results);
         this.errorAlert(error);
        }

      });
    }


  //USD Invoice row creator
  createRows(data,body){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {
      if(data.items[index-1].amountUSD){
      var row = xmlDoc.createElement("row");
      xmlDoc.getElementsByTagName("Document_Lines")[0].appendChild(row);

     
      var item = xmlDoc.createElement("ItemCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemcode);
      xmlDoc.getElementsByTagName("row")[index].appendChild(item);
      item.appendChild(itemText);

      var quantity = xmlDoc.createElement("Quantity");
      var quantityText = xmlDoc.createTextNode("1");
      xmlDoc.getElementsByTagName("row")[index].appendChild(quantity);
      quantity.appendChild(quantityText);

      var total = xmlDoc.createElement("dis:RowTotalFC");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountUSD);
      xmlDoc.getElementsByTagName("row")[index].appendChild(total);
      total.appendChild(totalText);
      }
    }

    return xmlDoc.documentElement;
  }

//ZWD Invoice row creator
createRowsINZWD(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");
  console.log(data)
  console.log(xmlDoc)
  for (var index = 1; index <= data.items.length; ++index) {
    if(data.items[index-1].amountZWD){
     
    var row = xmlDoc.createElement("row");
    xmlDoc.getElementsByTagName("Document_Lines")[0].appendChild(row);

   
    var item = xmlDoc.createElement("ItemCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].linkid+"_01");
    xmlDoc.getElementsByTagName("row")[index].appendChild(item);
    item.appendChild(itemText);

    var quantity = xmlDoc.createElement("Quantity");
    var quantityText = xmlDoc.createTextNode("1");
    xmlDoc.getElementsByTagName("row")[index].appendChild(quantity);
    quantity.appendChild(quantityText);

    var total = xmlDoc.createElement("dis:LineTotal");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountZWD);
    xmlDoc.getElementsByTagName("row")[index].appendChild(total);
    total.appendChild(totalText);
    }
  }
  console.log(xmlDoc)
  return xmlDoc.documentElement;
}
//ZAR Invoice row creator
createRowsINZAR(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {
    if(data.items[index-1].amountZAR){
    var row = xmlDoc.createElement("row");
    xmlDoc.getElementsByTagName("Document_Lines")[0].appendChild(row);

   
    var item = xmlDoc.createElement("ItemCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].linkid+"_03");
    xmlDoc.getElementsByTagName("row")[index].appendChild(item);
    item.appendChild(itemText);

    var quantity = xmlDoc.createElement("Quantity");
    var quantityText = xmlDoc.createTextNode("1");
    xmlDoc.getElementsByTagName("row")[index].appendChild(quantity);
    quantity.appendChild(quantityText);

    var total = xmlDoc.createElement("dis:RowTotalFC");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountZAR);
    xmlDoc.getElementsByTagName("row")[index].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}

//BWP Invoice row creator
createRowsINBWP(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {
    if(data.items[index-1].amountBWP){
    var row = xmlDoc.createElement("row");
    xmlDoc.getElementsByTagName("Document_Lines")[0].appendChild(row);

   
    var item = xmlDoc.createElement("ItemCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].linkid+"_02");
    xmlDoc.getElementsByTagName("row")[index].appendChild(item);
    item.appendChild(itemText);

    var quantity = xmlDoc.createElement("Quantity");
    var quantityText = xmlDoc.createTextNode("1");
    xmlDoc.getElementsByTagName("row")[index].appendChild(quantity);
    quantity.appendChild(quantityText);

    var total = xmlDoc.createElement("dis:RowTotalFC");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountBWP);
    xmlDoc.getElementsByTagName("row")[index].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}

//GBP Invoice row creator
createRowsINGBP(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {
    if(data.items[index-1].amountGBP){
    var row = xmlDoc.createElement("row");
    xmlDoc.getElementsByTagName("Document_Lines")[0].appendChild(row);

   
    var item = xmlDoc.createElement("ItemCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].linkid+"_04");
    xmlDoc.getElementsByTagName("row")[index].appendChild(item);
    item.appendChild(itemText);

    var quantity = xmlDoc.createElement("Quantity");
    var quantityText = xmlDoc.createTextNode("1");
    xmlDoc.getElementsByTagName("row")[index].appendChild(quantity);
    quantity.appendChild(quantityText);

    var total = xmlDoc.createElement("dis:RowTotalFC");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountGBP);
    xmlDoc.getElementsByTagName("row")[index].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}

//BWP Invoice row creator
createRowsINEUR(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {
    if(data.items[index-1].amountEUR){
    var row = xmlDoc.createElement("row");
    xmlDoc.getElementsByTagName("Document_Lines")[0].appendChild(row);

   
    var item = xmlDoc.createElement("ItemCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].linkid+"_05");
    xmlDoc.getElementsByTagName("row")[index].appendChild(item);
    item.appendChild(itemText);

    var quantity = xmlDoc.createElement("Quantity");
    var quantityText = xmlDoc.createTextNode("1");
    xmlDoc.getElementsByTagName("row")[index].appendChild(quantity);
    quantity.appendChild(quantityText);

    var total = xmlDoc.createElement("dis:RowTotalFC");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountEUR);
    xmlDoc.getElementsByTagName("row")[index].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}


//Payment on Account BP
payBP(sessionid,docdata,accountCode,currency){
 // let tranDate = this.formateDate(docdata.paymentDate);
    let headers = new Headers();

    let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
    '<env:Header>'+
        '<SessionID>'+sessionid+'</SessionID>'+
    '</env:Header>'+
    '<env:Body>'+
        '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
        '<BOM>'+
          '<BO>'+
          '<AdmInfo>'+
            '<Object>oIncomingPayments</Object>'+
          '</AdmInfo>'+
            '<Payments>'+
             '<row>'+
                '<CardCode>'+docdata.cardcode2+'</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
                '<dis:DocCurrency>'+currency+'</dis:DocCurrency>'+
                '<dis:TransferSum>'+docdata.amount+'</dis:TransferSum>'+
                '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
                '<dis:TransferReference>'+docdata.bankref+'</dis:TransferReference>'+
                '<dis:Remarks>'+docdata.comment+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.comment+'</dis:JournalRemarks>'+
             '</row>'+
            '</Payments>'+
        '</BO>'+
        '</BOM>'+
        '</dis:AddObject>'+
        '</env:Body>'+
        '</env:Envelope>';


    this.http.post(this.url,body,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
        var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
        //console.log(results);
        this.restservice.addUnknownPayment(docdata,results);

      }catch{
        var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       // console.log(results);
         this.errorAlert(error);
        }


    });
}



//pay USD Invoice with Journal
payInvoiceUSDLate(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,JournalXml){

  //let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.cardcode2+'</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>USD</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalUSD+'</dis:TransferSum>'+
              '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalUSD+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      this.restservice.updateInvoiceStatus(docdata.id);
     // this.addJournalXml(JournalXml,docdata.id);

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });



  }


//pay BWP Invoice with Journal
payInvoiceBWPLate(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,JournalXml){

  //let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
           '<CardCode>'+docdata.cardcode2+'</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>BWP</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalBWP+'</dis:TransferSum>'+
              '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalBWP+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalXml(JournalXml,docdata.id);
      this.restservice.updateInvoiceStatus(docdata.id);

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });



  }


//pay ZAR Invoice with Journal
payInvoiceZARLate(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,JournalXml){

  //let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
           '<CardCode>'+docdata.cardcode2+'</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>ZAR</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalZAR+'</dis:TransferSum>'+
              '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalZAR+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalXml(JournalXml,docdata.id);
      this.restservice.updateInvoiceStatus(docdata.id);

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });



  }


//pay ZAR Invoice with Journal
payInvoiceZWDLate(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,JournalXml){

  //let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
           '<CardCode>'+docdata.cardcode2+'</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>ZWD</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalZWD+'</dis:TransferSum>'+
              '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalZWD+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalXml(JournalXml,docdata.id);
      this.restservice.updateInvoiceStatus(docdata.id);

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });

  }

//pay GBP Invoice with Journal
payInvoiceGBPLate(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,JournalXml){

  //let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
           '<CardCode>'+docdata.cardcode2+'</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>GBP</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalGBP+'</dis:TransferSum>'+
              '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalGBP+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalXml(JournalXml,docdata.id);
      this.restservice.updateInvoiceStatus(docdata.id);

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });



  }


//pay EUR Invoice with Journal
payInvoiceEURLate(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,JournalXml){

//let tranDate = this.formateDate(docdata.transferDate);
let headers = new Headers();

let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
'<env:Header>'+
    '<SessionID>'+sessionid+'</SessionID>'+
'</env:Header>'+
'<env:Body>'+
    '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
    '<BOM>'+
      '<BO>'+
      '<AdmInfo>'+
        '<Object>oIncomingPayments</Object>'+
      '</AdmInfo>'+
        '<Payments>'+
         '<row>'+
         '<CardCode>'+docdata.cardcode2+'</CardCode>'+
            '<DocTypte>rCustomer</DocTypte>'+
            '<dis:DocCurrency>EUR</dis:DocCurrency>'+
            '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
            '<dis:TransferSum>'+docdata.totalEUR+'</dis:TransferSum>'+
            '<dis:TransferDate>'+docdata.paymentDate+'</dis:TransferDate>'+
            '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
            '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
            '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
         '</row>'+
        '</Payments>'+
      '<Payments_Invoices>'+
         '<row>'+
          '<DocEntry>'+invoiceNumber+'</DocEntry>'+
          '<InvoiceType>it_Invoice</InvoiceType>'+
          '<SumApplied>'+docdata.totalEUR+'</SumApplied>'+
        '</row>'+
      '</Payments_Invoices>'+
    '</BO>'+
    '</BOM>'+
    '</dis:AddObject>'+
    '</env:Body>'+
    '</env:Envelope>';


this.http.post(this.url,body,{headers:headers})
.map(res => res.text())
.subscribe(data => {
  //console.log(data);
  //console.log(parseFloat(docdata.date));
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(data,"text/xml");
  try{
    var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
    //console.log(results);
    //this.addJournalXml(JournalXml,docdata.id);
    this.restservice.updateInvoiceStatus(docdata.id);

  }catch{
    var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
   // console.log(results);
     this.errorAlert(error);
    }


});



}


// //pay USD Invoice
//   payInvoice(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){
//     if(docdata.paymentType == "Part"){
//      console.log(docdata);

//      if(docdata.items.amountUSD != "0.00"){
//       docdata.items.forEach(element => {

//         let headers = new Headers();

//         let body =
//             '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
//             '<env:Header>'+
//             '<SessionID>'+sessionid+'</SessionID>'+
//             '</env:Header>'+
//             '<env:Body>'+
//             '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
//             '<BOM>'+
//             '<BO>'+
//             '<AdmInfo>'+
//             '<Object>oIncomingPayments</Object>'+
//             '</AdmInfo>'+
//             '<Payments>'+
//             '<row>'+
//              '<CardCode>'+docdata.cardcode+'</CardCode>'+
//             '<DocTypte>rCustomer</DocTypte>'+
//             '<dis:CashAccount>'+element.itemaccount[0]+'</dis:CashAccount>'+
//             '<dis:CashSum>'+element.amountUSD+'</dis:CashSum>'+
//             '<dis:Remarks>GReg Test 1</dis:Remarks>'+
//             '<dis:JournalRemarks>GReg test 1</dis:JournalRemarks>'+
//             '</row>'+
//             '</Payments>'+
//             '<Payments_Invoices>'+
//             '<row>'+
//             '<DocEntry>'+invoiceNumber+'</DocEntry>'+
//             '<InvoiceType>it_Invoice</InvoiceType>'+
//             '<dis:AppliedFC>'+element.amountUSD+'</dis:AppliedFC>'+
//             '</row>'+
//             '</Payments_Invoices>'+
//             '</BO>'+
//             '</BOM>'+
//             '</dis:AddObject>'+
//             '</env:Body>'+
//             '</env:Envelope>';
//             //console.log(docdata);

//             //let mainbody = this.createRows2(docdata,body);

//             //console.log(mainbody);
//             //var sXML = new XMLSerializer().serializeToString(mainbody);

//         this.http.post(this.url,body,{headers:headers})
//         .map(res => res.text())
//         .subscribe(data => {
//           //console.log(data);
//           //console.log(parseFloat(docdata.date));
//           var parser = new DOMParser();
//           var xmlDoc = parser.parseFromString(data,"text/xml");
//           try{
//             var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
//             //console.log(results);
//             let nav = this.app.getActiveNav();
//             nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});


//           }catch{
//             var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
//              //console.log(results);
//              this.errorAlert(error);
//             }

//         });

//        });

//     }

//     if(docdata.items.amountZAR != "0.00"){

//    }
//    if(docdata.items.amountGBP != "0.00"){

//    }
//    if(docdata.items.amountBWP != "0.00"){

//    }
//    if(docdata.items.amountEUR != "0.00"){

//    }



//   }
//     if(docdata.paymentType == "Transfer"){
//     let tranDate = this.formateDate(docdata.transferDate);
//     let headers = new Headers();

//     let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
//     '<env:Header>'+
//         '<SessionID>'+sessionid+'</SessionID>'+
//     '</env:Header>'+
//     '<env:Body>'+
//         '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
//         '<BOM>'+
//           '<BO>'+
//           '<AdmInfo>'+
//             '<Object>oIncomingPayments</Object>'+
//           '</AdmInfo>'+
//             '<Payments>'+
//              '<row>'+
//                 '<CardCode>'+docdata.cardcode+'</CardCode>'+
//                 '<DocTypte>rCustomer</DocTypte>'+
//                 '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
//                 '<dis:TransferSum>'+docdata.totalUSD+'</dis:TransferSum>'+
//                 '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
//                 '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
//                 '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
//                 '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
//              '</row>'+
//             '</Payments>'+
//           '<Payments_Invoices>'+
//              '<row>'+
//               '<DocEntry>'+invoiceNumber+'</DocEntry>'+
//               '<InvoiceType>it_Invoice</InvoiceType>'+
//               '<SumApplied>'+docdata.totalUSD+'</SumApplied>'+
//             '</row>'+
//           '</Payments_Invoices>'+
//         '</BO>'+
//         '</BOM>'+
//         '</dis:AddObject>'+
//         '</env:Body>'+
//         '</env:Envelope>';


//     this.http.post(this.url,body,{headers:headers})
//     .map(res => res.text())
//     .subscribe(data => {
//       //console.log(data);
//       //console.log(parseFloat(docdata.date));
//       var parser = new DOMParser();
//       var xmlDoc = parser.parseFromString(data,"text/xml");
//       try{
//         var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
//         //console.log(results);
//        this.addJournal(sessionid,docdata,invoiceNumber,results,accountCode2);

//       }catch{
//         var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
//        // console.log(results);
//          this.errorAlert(error);
//         }


//     });
//     }

//     if(docdata.paymentType == "Cash"){


//     let headers = new Headers();

//     let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
//     '<env:Header>'+
//     '<SessionID>'+sessionid+'</SessionID>'+
//     '</env:Header>'+
//     '<env:Body>'+
//     '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
//     '<BOM>'+
//     '<BO>'+
//     '<AdmInfo>'+
//     '<Object>oIncomingPayments</Object>'+
//     '</AdmInfo>'+
//     '<Payments>'+
//     '<row>'+
//       '<CardCode>'+docdata.cardcode+'</CardCode>'+
//       '<DocTypte>rCustomer</DocTypte>'+
//       '<dis:CashAccount>'+accountCode+'</dis:CashAccount>'+
//       '<dis:CashSum>'+docdata.totalUSD+'</dis:CashSum>'+
//       '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
//       '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
//     '</row>'+
//    '</Payments>'+
//    '<Payments_Invoices>'+
//     '<row>'+
//     '<DocEntry>'+invoiceNumber+'</DocEntry>'+
//      '<InvoiceType>it_Invoice</InvoiceType>'+
//      '<SumApplied>'+docdata.totalUSD+'</SumApplied>'+
//     '</row>'+
//    '</Payments_Invoices>'+
//   '</BO>'+
//   '</BOM>'+
//   '</dis:AddObject>'+
//   '</env:Body>'+
//   '</env:Envelope>';


//     this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
//     .map(res => res.text())
//     .subscribe(data => {
//        console.log(data);
//       //console.log(parseFloat(docdata.date));
//       var parser = new DOMParser();
//       var xmlDoc = parser.parseFromString(data,"text/xml");
//       try{
//         var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
//         //console.log(results);
//         this.addJournal(sessionid,docdata,invoiceNumber,results,accountCode2);

//       }catch{
//         var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
//       //console.log(results);
//        this.errorAlert(error);
//        }

//       //this.filteredusers = results;
//       //this.temparr = results;
//     });
//     }
//   }

  
//pay USD Invoice
payInvoice(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){
  //this.receiptCounter -= 1
  //console.log(this.receiptCounter)
  if(docdata.paymentType == "Transfer"){
  let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.addid+'_001</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalUSD+'</dis:TransferSum>'+
              '<dis:DocCurrency>USD</dis:DocCurrency>'+
              '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalUSD+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      console.log(results);
      //this.addJournal(sessionid,docdata,invoiceNumber,results,accountCode2);
      console.log(this.receiptCounter)
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }
     


    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
      // console.log(error);
       this.errorAlert(error);
      }
  });
  }

  if(docdata.paymentType == "Cash"){

    let Partpayments = ''
    for (var index = 1; index <= docdata.items.length; ++index) {     
      if(docdata.items[index-1].amountUSD){     
      Partpayments += '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
              '<BOM>'+
              '<BO>'+
              '<AdmInfo>'+
              '<Object>oIncomingPayments</Object>'+
              '</AdmInfo>'+
              '<Payments>'+
              '<row>'+
                '<CardCode>'+docdata.addid+'_001</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:CashAccount>'+docdata.items[index-1].itemaccount[0]+'</dis:CashAccount>'+
                '<dis:DocCurrency>USD</dis:DocCurrency>'+
                '<dis:CashSum>'+docdata.items[index-1].amountUSD+'</dis:CashSum>'+
                '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
              '</row>'+  
            '</Payments>'+
              '<Payments_Invoices>'+
              '<row>'+
              '<DocEntry>'+invoiceNumber+'</DocEntry>'+
              '<InvoiceType>it_Invoice</InvoiceType>'+
              '<AppliedFC>'+docdata.items[index-1].amountUSD+'</AppliedFC>'+   
              '</row>'+
            '</Payments_Invoices>'+
            '</BO>'+
            '</BOM>'+
            '</dis:AddObject>';      
      }
    }
    //console.log(Partpayments)
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
  '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+ Partpayments+
  '</env:Body>'+
  '</env:Envelope>';

  this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournal(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
    //console.log(results);
     this.errorAlert(error);
     }

    //this.filteredusers = results;
    //this.temparr = results;
  });
  }
}

//pay ZAR Invoice
 payInvoiceZAR(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){
  
  //console.log(this.receiptCounter)
  if(docdata.paymentType == "Transfer"){
  let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.addid+'_001</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>ZAR</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalZAR+'</dis:TransferSum>'+
              '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalZAR+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      console.log(results);
      //this.addJournalZAR(sessionid,docdata,invoiceNumber,results,accountCode2);
      console.log(this.receiptCounter)
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });
  }

  if(docdata.paymentType == "Cash"){

    let Partpayments = ''
    for (var index = 1; index <= docdata.items.length; ++index) {     
      if(docdata.items[index-1].amountZAR){     
      Partpayments += '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
              '<BOM>'+
              '<BO>'+
              '<AdmInfo>'+
              '<Object>oIncomingPayments</Object>'+
              '</AdmInfo>'+
              '<Payments>'+
              '<row>'+
                '<CardCode>'+docdata.addid+'_001</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:CashAccount>'+docdata.items[index-1].itemaccount[0]+'</dis:CashAccount>'+
                '<dis:DocCurrency>ZAR</dis:DocCurrency>'+
                '<dis:CashSum>'+docdata.items[index-1].amountZAR+'</dis:CashSum>'+
                '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
              '</row>'+  
            '</Payments>'+
              '<Payments_Invoices>'+
              '<row>'+
              '<DocEntry>'+invoiceNumber+'</DocEntry>'+
              '<InvoiceType>it_Invoice</InvoiceType>'+
              '<AppliedFC>'+docdata.items[index-1].amountZAR+'</AppliedFC>'+   
              '</row>'+
            '</Payments_Invoices>'+
            '</BO>'+
            '</BOM>'+
            '</dis:AddObject>';      
      }
    }
   // console.log(Partpayments)
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
  '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+ Partpayments+
  '</env:Body>'+
  '</env:Envelope>';


  this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
     // console.log(results);
      //this.addJournalZAR(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
    //console.log(results);
     this.errorAlert(error);
     }

    //this.filteredusers = results;
    //this.temparr = results;
  });
  }
}


//pay ZWD Invoice
payInvoiceZWD(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){
  
  if(docdata.paymentType == "Transfer"){
  let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.addid+'_001</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalZWD+'</dis:TransferSum>'+
              '<dis:DocCurrency>ZWD</dis:DocCurrency>'+
              '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalZWD+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      console.log(results);
      //this.addJournalZWD(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });
  }

  if(docdata.paymentType == "Cash"){
    let Partpayments = ''
    for (var index = 1; index <= docdata.items.length; ++index) {     
      if(docdata.items[index-1].amountZWD){     
      Partpayments += '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
              '<BOM>'+
              '<BO>'+
              '<AdmInfo>'+
              '<Object>oIncomingPayments</Object>'+
              '</AdmInfo>'+
              '<Payments>'+
              '<row>'+
                '<CardCode>'+docdata.addid+'_001</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:CashAccount>'+docdata.items[index-1].itemaccount[0]+'</dis:CashAccount>'+
                '<dis:DocCurrency>ZWD</dis:DocCurrency>'+
                '<dis:CashSum>'+docdata.items[index-1].amountZWD+'</dis:CashSum>'+
                '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
              '</row>'+  
            '</Payments>'+
              '<Payments_Invoices>'+
              '<row>'+
              '<DocEntry>'+invoiceNumber+'</DocEntry>'+
              '<InvoiceType>it_Invoice</InvoiceType>'+
              '<SumApplied>'+docdata.items[index-1].amountZWD+'</SumApplied>'+   
              '</row>'+
            '</Payments_Invoices>'+
            '</BO>'+
            '</BOM>'+
            '</dis:AddObject>';      
      }
    }
   // console.log(Partpayments)
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
  '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+ Partpayments+
  '</env:Body>'+
  '</env:Envelope>';


  this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     // this.addJournalZWD(sessionid,docdata,invoiceNumber,results,accountCode2);
     if(this.receiptCounter == 1){
      let nav = this.app.getActiveNav();
      this.loader.dismiss();
      nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
      
    }else{
      this.receiptCounter -= 1
    }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
    //console.log(results);
     this.errorAlert(error);
     }

    //this.filteredusers = results;
    //this.temparr = results;
  });
   }
}


//pay BWP Invoice
payInvoiceBWP(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){
  
  if(docdata.paymentType == "Transfer"){
  let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.addid+'_001</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>BWP</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalBWP+'</dis:TransferSum>'+
              '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalBWP+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalBWP(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });
  }

  if(docdata.paymentType == "Cash"){
    let Partpayments = ''
    for (var index = 1; index <= docdata.items.length; ++index) {     
      if(docdata.items[index-1].amountBWP){     
      Partpayments += '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
              '<BOM>'+
              '<BO>'+
              '<AdmInfo>'+
              '<Object>oIncomingPayments</Object>'+
              '</AdmInfo>'+
              '<Payments>'+
              '<row>'+
                '<CardCode>'+docdata.addid+'_001</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:CashAccount>'+docdata.items[index-1].itemaccount[0]+'</dis:CashAccount>'+
                '<dis:DocCurrency>BWP</dis:DocCurrency>'+
                '<dis:CashSum>'+docdata.items[index-1].amountBWP+'</dis:CashSum>'+
                '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
              '</row>'+  
            '</Payments>'+
              '<Payments_Invoices>'+
              '<row>'+
              '<DocEntry>'+invoiceNumber+'</DocEntry>'+
              '<InvoiceType>it_Invoice</InvoiceType>'+
              '<AppliedFC>'+docdata.items[index-1].amountBWP+'</AppliedFC>'+   
              '</row>'+
            '</Payments_Invoices>'+
            '</BO>'+
            '</BOM>'+
            '</dis:AddObject>';      
      }
    }
   // console.log(Partpayments)
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
  '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+ Partpayments+
  '</env:Body>'+
  '</env:Envelope>';


  this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalBWP(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
    //console.log(results);
     this.errorAlert(error);
     }

    //this.filteredusers = results;
    //this.temparr = results;
  });
  }
}


//pay GBP Invoice
payInvoiceGBP(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){
  
  if(docdata.paymentType == "Transfer"){
  let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.addid+'_001</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>GBP</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalGBP+'</dis:TransferSum>'+
              '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalGBP+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     //this.addJournalGBP(sessionid,docdata,invoiceNumber,results,accountCode2);
     if(this.receiptCounter == 1){
      let nav = this.app.getActiveNav();
      this.loader.dismiss();
      nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
      
    }else{
      this.receiptCounter -= 1
    }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });
  }

  if(docdata.paymentType == "Cash"){
    let Partpayments = ''
    for (var index = 1; index <= docdata.items.length; ++index) {     
      if(docdata.items[index-1].amountGBP){     
      Partpayments += '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
              '<BOM>'+
              '<BO>'+
              '<AdmInfo>'+
              '<Object>oIncomingPayments</Object>'+
              '</AdmInfo>'+
              '<Payments>'+
              '<row>'+
                '<CardCode>'+docdata.addid+'_001</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:CashAccount>'+docdata.items[index-1].itemaccount[0]+'</dis:CashAccount>'+
                '<dis:DocCurrency>GBP</dis:DocCurrency>'+
                '<dis:CashSum>'+docdata.items[index-1].amountGBP+'</dis:CashSum>'+
                '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
              '</row>'+  
            '</Payments>'+
              '<Payments_Invoices>'+
              '<row>'+
              '<DocEntry>'+invoiceNumber+'</DocEntry>'+
              '<InvoiceType>it_Invoice</InvoiceType>'+
              '<AppliedFC>'+docdata.items[index-1].amountGBP+'</AppliedFC>'+   
              '</row>'+
            '</Payments_Invoices>'+
            '</BO>'+
            '</BOM>'+
            '</dis:AddObject>';      
      }
    }
   // console.log(Partpayments)
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
  '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+ Partpayments+
  '</env:Body>'+
  '</env:Envelope>';



  this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalGBP(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
    //console.log(results);
     this.errorAlert(error);
     }

    //this.filteredusers = results;
    //this.temparr = results;
  });
  }
}


//pay EUR Invoice
payInvoiceEUR(sessionid,invoiceNumber,docdata,newdate,newduedate,accountCode,accountCode2){


  if(docdata.paymentType == "Transfer"){
  let tranDate = this.formateDate(docdata.transferDate);
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
          '<Object>oIncomingPayments</Object>'+
        '</AdmInfo>'+
          '<Payments>'+
           '<row>'+
              '<CardCode>'+docdata.addid+'_001</CardCode>'+
              '<DocTypte>rCustomer</DocTypte>'+
              '<dis:DocCurrency>EUR</dis:DocCurrency>'+
              '<dis:TransferAccount>'+accountCode+'</dis:TransferAccount>'+
              '<dis:TransferSum>'+docdata.totalEUR+'</dis:TransferSum>'+
              '<dis:TransferDate>'+tranDate+'</dis:TransferDate>'+
              '<dis:TransferReference>'+docdata.ref+'</dis:TransferReference>'+
              '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
              '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
           '</row>'+
          '</Payments>'+
        '<Payments_Invoices>'+
           '<row>'+
            '<DocEntry>'+invoiceNumber+'</DocEntry>'+
            '<InvoiceType>it_Invoice</InvoiceType>'+
            '<SumApplied>'+docdata.totalEUR+'</SumApplied>'+
          '</row>'+
        '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';


  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     //this.addJournalEUR(sessionid,docdata,invoiceNumber,results,accountCode2);
     if(this.receiptCounter == 1){
      let nav = this.app.getActiveNav();
      this.loader.dismiss();
      nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
      
    }else{
      this.receiptCounter -= 1
    }
    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
     // console.log(results);
       this.errorAlert(error);
      }


  });
  }

  if(docdata.paymentType == "Cash"){

    let Partpayments = ''
    for (var index = 1; index <= docdata.items.length; ++index) {     
      if(docdata.items[index-1].amountEUR){     
      Partpayments += '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
              '<BOM>'+
              '<BO>'+
              '<AdmInfo>'+
              '<Object>oIncomingPayments</Object>'+
              '</AdmInfo>'+
              '<Payments>'+
              '<row>'+
                '<CardCode>'+docdata.addid+'_001</CardCode>'+
                '<DocTypte>rCustomer</DocTypte>'+
                '<dis:CashAccount>'+docdata.items[index-1].itemaccount[0]+'</dis:CashAccount>'+
                '<dis:DocCurrency>EUR</dis:DocCurrency>'+
                '<dis:CashSum>'+docdata.items[index-1].amountEUR+'</dis:CashSum>'+
                '<dis:Remarks>'+docdata.description+'</dis:Remarks>'+
                '<dis:JournalRemarks>'+docdata.description+'</dis:JournalRemarks>'+
              '</row>'+  
            '</Payments>'+
              '<Payments_Invoices>'+
              '<row>'+
              '<DocEntry>'+invoiceNumber+'</DocEntry>'+
              '<InvoiceType>it_Invoice</InvoiceType>'+
              '<AppliedFC>'+docdata.items[index-1].amountEUR+'</AppliedFC>'+   
              '</row>'+
            '</Payments_Invoices>'+
            '</BO>'+
            '</BOM>'+
            '</dis:AddObject>';      
      }
    }
   // console.log(Partpayments)
  let headers = new Headers();

  let body = '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
  '<env:Header>'+
  '<SessionID>'+sessionid+'</SessionID>'+
  '</env:Header>'+
  '<env:Body>'+ Partpayments+
  '</env:Body>'+
  '</env:Envelope>';


  this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      //this.addJournalEUR(sessionid,docdata,invoiceNumber,results,accountCode2);
      if(this.receiptCounter == 1){
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoiceNumber,payment:results,journal:results,docdata:docdata,sessionID:sessionid});
        
      }else{
        this.receiptCounter -= 1
      }

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
    //console.log(results);
     this.errorAlert(error);
     }

    //this.filteredusers = results;
    //this.temparr = results;
  });
  }
}

//saving journal xml to SQL
addJournalLate(sessionid,docdata,payment,invoice,accountCode,amount,currency,id){
 // console.log(id);
  let headers = new Headers();
  var sXML;

  let body = '<?xml version="1.0" ?>'+
  '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
   '<env:Header>'+
   '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
      '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
      '<BOM>'+
      '<BO>'+
      '<AdmInfo>'+
      '<Object>oJournalEntries</Object>'+
      '</AdmInfo>'+
      '<JournalEntries>'+
      '<row>'+
      '<Memo>'+docdata.description+'</Memo>'+
      '<dis:Reference>IN'+invoice+'</dis:Reference>'+
       '<dis:Reference2>P'+payment+'</dis:Reference2>'+
      '</row>'+
      '</JournalEntries>'+
      '<JournalEntries_Lines>'+
      '<row>'+
      '<dis:FCCurrency>'+currency+'</dis:FCCurrency>'+
      '<AccountCode>'+accountCode+'</AccountCode>'+
      '<FCCredit>'+amount+'</FCCredit>'+
      '</row>'+
      '</JournalEntries_Lines>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';
      //console.log(docdata);
      if(currency == "USD"){
        let mainbody = this.createRows2(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "BWP"){
        let mainbody = this.createRows44(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "ZAR"){
        let mainbody = this.createRows33(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "ZWD"){
        let mainbody = this.createRows7(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "GBP"){
        let mainbody = this.createRows55(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "EUR"){
        let mainbody = this.createRows66(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }


      //console.log(mainbody);
     // var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      if(this.receiptCounterLate == 1){
        this.restservice.updateInvoiceXml(id,sXML);
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoice,payment:payment,journal:"Late",docdata:docdata,sessionID:sessionid});
        this.receiptCounterLate = 0
   
      }else{
        this.receiptCounterLate -= 1
      }
    

}

//Journal for unknown payments USD

addJournalUnknown(sessionid,docdata,payment,invoice,accountCode,amount,currency,id){
  //console.log(accountCode);
  let headers = new Headers();
  var sXML;
  let body;
  if(currency == "ZWD"){
    body = '<?xml version="1.0" ?>'+
    '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
     '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
        '</env:Header>'+
        '<env:Body>'+
        '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
        '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
        '<Object>oJournalEntries</Object>'+
        '</AdmInfo>'+
        '<JournalEntries>'+
        '<row>'+
        '<Memo>'+docdata.description+'</Memo>'+
        '<dis:Reference>IN'+invoice+'</dis:Reference>'+
         '<dis:Reference2>P'+payment+'</dis:Reference2>'+
        '</row>'+
        '</JournalEntries>'+
        '<JournalEntries_Lines>'+
        '<row>'+        
        '<AccountCode>'+accountCode+'</AccountCode>'+
        '<Credit>'+amount+'</Credit>'+
        '</row>'+
        '</JournalEntries_Lines>'+
        '</BO>'+
        '</BOM>'+
        '</dis:AddObject>'+
        '</env:Body>'+
        '</env:Envelope>';
   
  }else{
    body = '<?xml version="1.0" ?>'+
    '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
     '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
        '</env:Header>'+
        '<env:Body>'+
        '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
        '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
        '<Object>oJournalEntries</Object>'+
        '</AdmInfo>'+
        '<JournalEntries>'+
        '<row>'+
        '<Memo>'+docdata.description+'</Memo>'+
        '<dis:Reference>IN'+invoice+'</dis:Reference>'+
         '<dis:Reference2>P'+payment+'</dis:Reference2>'+
        '</row>'+
        '</JournalEntries>'+
        '<JournalEntries_Lines>'+
        '<row>'+
        '<dis:FCCurrency>'+currency+'</dis:FCCurrency>'+
        '<AccountCode>'+accountCode+'</AccountCode>'+
        '<FCCredit>'+amount+'</FCCredit>'+
        '</row>'+
        '</JournalEntries_Lines>'+
        '</BO>'+
        '</BOM>'+
        '</dis:AddObject>'+
        '</env:Body>'+
        '</env:Envelope>';
   
  }
      //console.log(docdata);
      if(currency == "USD"){
        let mainbody = this.createRows2(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "BWP"){
        let mainbody = this.createRows44(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "ZAR"){
        let mainbody = this.createRows33(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "ZWD"){
        let mainbody = this.createRows7(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "GBP"){
        let mainbody = this.createRows55(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }
      if(currency == "EUR"){
        let mainbody = this.createRows66(docdata,body);
        sXML = new XMLSerializer().serializeToString(mainbody);
      }


      //console.log(mainbody);
     //this.restservice.updateInvoiceXml(id,sXML);

  this.http.post(this.url,sXML,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      let nav = this.app.getActiveNav();
      this.loader.dismiss();
      nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});
      this.restservice.updateAccountState(id);

    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       //console.log(results);
       this.errorAlert(error);
      }

  });

}


//USD Journal Function
partPayInvoiceUSD(sessionid,docdata,invoice,payment,accountCode){
  //console.log(docdata);
  let headers = new Headers();

  let body =
      '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">'+
      '<env:Header>'+
      '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
      '<dis:AddObject xmlns:dis="http://www.sap.com/SBO/DIS" CommandID="Add Incoming Payment">'+
      '<BOM>'+
      '<BO>'+
      '<AdmInfo>'+
      '<Object>oIncomingPayments</Object>'+
      '</AdmInfo>'+
      '<Payments>'+
      '<row>'+
 	  	'<CardCode>CDST0002_001</CardCode>'+
    	'<DocTypte>rCustomer</DocTypte>'+
    	'<dis:CashAccount>_SYS00000001288</dis:CashAccount>'+
      '<dis:CashSum>50</dis:CashSum>'+
    	'<dis:Remarks>GReg Test 1</dis:Remarks>'+
      '<dis:JournalRemarks>GReg test 1</dis:JournalRemarks>'+
      '</row>'+
      '</Payments>'+
      '<Payments_Invoices>'+
      '<row>'+
      '<DocEntry>'+invoice+'</DocEntry>'+
      '<InvoiceType>it_Invoice</InvoiceType>'+
      '<dis:AppliedFC>50</dis:AppliedFC>'+
      '</row>'+
      '</Payments_Invoices>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';
      //console.log(docdata);

      //let mainbody = this.createRows2(docdata,body);

      //console.log(mainbody);
      //var sXML = new XMLSerializer().serializeToString(mainbody);

  this.http.post(this.url,body,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
      var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
      let nav = this.app.getActiveNav();
      this.loader.dismiss();
      nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       //console.log(results);
       this.errorAlert(error);
      }

  });

}

  //USD Journal Function
  addJournal(sessionid,docdata,invoice,payment,accountCode){
   // console.log(accountCode);
    let headers = new Headers();

    let body = '<?xml version="1.0" ?>'+
    '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
     '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
        '</env:Header>'+
        '<env:Body>'+
        '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
        '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
        '<Object>oJournalEntries</Object>'+
        '</AdmInfo>'+
        '<JournalEntries>'+
        '<row>'+
        '<Memo>'+docdata.description+'</Memo>'+
        '<dis:Reference>IN'+invoice+'</dis:Reference>'+
         '<dis:Reference2>P'+payment+'</dis:Reference2>'+
        '</row>'+
        '</JournalEntries>'+
        '<JournalEntries_Lines>'+
        '<row>'+
        '<dis:FCCurrency>USD</dis:FCCurrency>'+
        '<AccountCode>'+accountCode+'</AccountCode>'+
        '<FCCredit>'+docdata.totalUSD+'</FCCredit>'+
        '</row>'+
        '</JournalEntries_Lines>'+
        '</BO>'+
        '</BOM>'+
        '</dis:AddObject>'+
        '</env:Body>'+
        '</env:Envelope>';
        //console.log(docdata);

        let mainbody = this.createRows2(docdata,body);

        //console.log(mainbody);
        var sXML = new XMLSerializer().serializeToString(mainbody);

    this.http.post(this.url,sXML,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
        var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
        //console.log(results);
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
        nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


      }catch{
        var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
         //console.log(results);
         this.errorAlert(error);
        }

    });

  }

  
  //ZWD Journal Function
  addJournalZWD(sessionid,docdata,invoice,payment,accountCode){
    console.log(accountCode);
    let headers = new Headers();

    let body = '<?xml version="1.0" ?>'+
    '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
     '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
        '</env:Header>'+
        '<env:Body>'+
        '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
        '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
        '<Object>oJournalEntries</Object>'+
        '</AdmInfo>'+
        '<JournalEntries>'+
        '<row>'+
        '<Memo>'+docdata.description+'</Memo>'+
        '<dis:Reference>IN'+invoice+'</dis:Reference>'+
         '<dis:Reference2>P'+payment+'</dis:Reference2>'+
        '</row>'+
        '</JournalEntries>'+
        '<JournalEntries_Lines>'+
        '<row>'+     
         
        '<AccountCode>'+accountCode+'</AccountCode>'+
        '<Credit>'+docdata.totalZWD+'</Credit>'+
        '</row>'+
        '</JournalEntries_Lines>'+
        '</BO>'+
        '</BOM>'+
        '</dis:AddObject>'+
        '</env:Body>'+
        '</env:Envelope>';
        //console.log(docdata);

        let mainbody = this.createRows7(docdata,body);

        //console.log(mainbody);
        var sXML = new XMLSerializer().serializeToString(mainbody);

    this.http.post(this.url,sXML,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
       var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
        //console.log(results);
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
       
       nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


      }catch{
        var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
         //console.log(results);
         this.errorAlert(error);
        }

    });

  }


  //ZAR Journal Function
  addJournalZAR(sessionid,docdata,invoice,payment,accountCode){
    //console.log(accountCode);
    let headers = new Headers();

    let body = '<?xml version="1.0" ?>'+
    '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
     '<env:Header>'+
     '<SessionID>'+sessionid+'</SessionID>'+
        '</env:Header>'+
        '<env:Body>'+
        '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
        '<BOM>'+
        '<BO>'+
        '<AdmInfo>'+
        '<Object>oJournalEntries</Object>'+
        '</AdmInfo>'+
        '<JournalEntries>'+
        '<row>'+
        '<Memo>'+docdata.description+'</Memo>'+
        '<dis:Reference>IN'+invoice+'</dis:Reference>'+
         '<dis:Reference2>P'+payment+'</dis:Reference2>'+
        '</row>'+
        '</JournalEntries>'+
        '<JournalEntries_Lines>'+
        '<row>'+  
        '<dis:FCCurrency>ZAR</dis:FCCurrency>'+      
        '<AccountCode>'+accountCode+'</AccountCode>'+
        '<FCCredit>'+docdata.totalZAR+'</FCCredit>'+
        '</row>'+
        '</JournalEntries_Lines>'+
        '</BO>'+
        '</BOM>'+
        '</dis:AddObject>'+
        '</env:Body>'+
        '</env:Envelope>';
        //console.log(docdata);

        let mainbody = this.createRows33(docdata,body);

        //console.log(mainbody);
        var sXML = new XMLSerializer().serializeToString(mainbody);

    this.http.post(this.url,sXML,{headers:headers})
    .map(res => res.text())
    .subscribe(data => {
      //console.log(data);
      //console.log(parseFloat(docdata.date));
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      try{
       var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
        //console.log(results);
        let nav = this.app.getActiveNav();
        this.loader.dismiss();
       nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


      }catch{
        var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
         //console.log(results);
         this.errorAlert(error);
        }

    });

  }

//BWP Journal Function
addJournalBWP(sessionid,docdata,invoice,payment,accountCode){

  let headers = new Headers();

  let body = '<?xml version="1.0" ?>'+
  '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
   '<env:Header>'+
   '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
      '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
      '<BOM>'+
      '<BO>'+
      '<AdmInfo>'+
      '<Object>oJournalEntries</Object>'+
      '</AdmInfo>'+
      '<JournalEntries>'+
      '<row>'+
      '<Memo>'+docdata.description+'</Memo>'+
      '<dis:Reference>IN'+invoice+'</dis:Reference>'+
       '<dis:Reference2>P'+payment+'</dis:Reference2>'+
      '</row>'+
      '</JournalEntries>'+
      '<JournalEntries_Lines>'+
      '<row>'+
      '<dis:FCCurrency>BWP</dis:FCCurrency>'+
      '<AccountCode>'+accountCode+'</AccountCode>'+
      '<FCCredit>'+docdata.totalBWP+'</FCCredit>'+
      '</row>'+
      '</JournalEntries_Lines>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';
      //console.log(docdata);

      let mainbody = this.createRows44(docdata,body);

      //console.log(mainbody);
      var sXML = new XMLSerializer().serializeToString(mainbody);

  this.http.post(this.url,sXML,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
     var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     let nav = this.app.getActiveNav();
     this.loader.dismiss();
     nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       //console.log(results);
       this.errorAlert(error);
      }

  });

}

//GBP Journal Function
addJournalGBP(sessionid,docdata,invoice,payment,accountCode){

  let headers = new Headers();

  let body = '<?xml version="1.0" ?>'+
  '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
   '<env:Header>'+
   '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
      '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
      '<BOM>'+
      '<BO>'+
      '<AdmInfo>'+
      '<Object>oJournalEntries</Object>'+
      '</AdmInfo>'+
      '<JournalEntries>'+
      '<row>'+
      '<Memo>'+docdata.description+'</Memo>'+
      '<dis:Reference>IN'+invoice+'</dis:Reference>'+
       '<dis:Reference2>P'+payment+'</dis:Reference2>'+
      '</row>'+
      '</JournalEntries>'+
      '<JournalEntries_Lines>'+
      '<row>'+
      '<dis:FCCurrency>GBP</dis:FCCurrency>'+
      '<AccountCode>'+accountCode+'</AccountCode>'+
      '<FCCredit>'+docdata.totalGBP+'</FCCredit>'+
      '</row>'+
      '</JournalEntries_Lines>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';
      //console.log(docdata);

      let mainbody = this.createRows55(docdata,body);

      //console.log(mainbody);
      var sXML = new XMLSerializer().serializeToString(mainbody);

  this.http.post(this.url,sXML,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
     var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     let nav = this.app.getActiveNav();
     this.loader.dismiss();
      nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       //console.log(results);
       this.errorAlert(error);
      }

  });

}

//EUR Journal Function
addJournalEUR(sessionid,docdata,invoice,payment,accountCode){

  let headers = new Headers();

  let body = '<?xml version="1.0" ?>'+
  '<env:Envelope xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">'+
   '<env:Header>'+
   '<SessionID>'+sessionid+'</SessionID>'+
      '</env:Header>'+
      '<env:Body>'+
      '<dis:AddObject CommandID="Add object" xmlns:dis="http://www.sap.com/SBO/DIS/">'+
      '<BOM>'+
      '<BO>'+
      '<AdmInfo>'+
      '<Object>oJournalEntries</Object>'+
      '</AdmInfo>'+
      '<JournalEntries>'+
      '<row>'+
      '<Memo>'+docdata.description+'</Memo>'+
      '<dis:Reference>IN'+invoice+'</dis:Reference>'+
       '<dis:Reference2>P'+payment+'</dis:Reference2>'+
      '</row>'+
      '</JournalEntries>'+
      '<JournalEntries_Lines>'+
      '<row>'+
      '<dis:FCCurrency>EUR</dis:FCCurrency>'+
      '<AccountCode>'+accountCode+'</AccountCode>'+
      '<FCCredit>'+docdata.totalEUR+'</FCCredit>'+
      '</row>'+
      '</JournalEntries_Lines>'+
      '</BO>'+
      '</BOM>'+
      '</dis:AddObject>'+
      '</env:Body>'+
      '</env:Envelope>';
      //console.log(docdata);

      let mainbody = this.createRows66(docdata,body);

      //console.log(mainbody);
      var sXML = new XMLSerializer().serializeToString(mainbody);

  this.http.post(this.url,sXML,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
     var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     let nav = this.app.getActiveNav();
     this.loader.dismiss();
     nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});


    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       //console.log(results);
       this.errorAlert(error);
      }

  });

}

addJournalXml(JournalXml,invoiceNumber){

  let headers = new Headers();


  this.http.post(this.url,JournalXml,{headers:headers})
  .map(res => res.text())
  .subscribe(data => {
    //console.log(data);
    //console.log(parseFloat(docdata.date));
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data,"text/xml");
    try{
     // var results = xmlDoc.getElementsByTagName("RetKey")[0].childNodes[0].nodeValue
      //console.log(results);
     // let nav = this.app.getActiveNav();
      //nav.push("PrintPage",{invoice: invoice,payment:payment,journal:results,docdata:docdata,sessionID:sessionid});
     // this.loader.dismiss();
      this.restservice.updateInvoiceStatus(invoiceNumber);
    }catch{
      var error = xmlDoc.getElementsByTagName("env:Text")[0].childNodes[0].nodeValue
       //console.log(results);
       this.errorAlert(error);
      }

  });

}

//Partpayment USD Row Creator
createRowsPartPayments(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {

    var row = xmlDoc.createElement("env:row");
    xmlDoc.getElementsByTagName("Payments")[0].appendChild(row);

    if(data.items[index-1].amountUSD != "0"){
    var item = xmlDoc.createElement("AccountCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
    item.appendChild(itemText);


    var total = xmlDoc.createElement("Debit");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountUSD);
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
    total.appendChild(totalText);
    }

  }

  return xmlDoc.documentElement;
}


//Journal USD Row Creator
  createRows2(data,body){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {

      var row = xmlDoc.createElement("env:row");
      xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

      if(data.items[index-1].amountUSD != "0"){
        var currency = xmlDoc.createElement("FCCurrency");
        var currency_text = xmlDoc.createTextNode("USD")//data.items[index-1].itemaccount[5]);
        xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
        currency.appendChild(currency_text);

       // console.log(data.items[index-1].itemaccount[6])
      var item = xmlDoc.createElement("AccountCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
      item.appendChild(itemText);


      var total = xmlDoc.createElement("FCDebit");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountUSD);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
      total.appendChild(totalText);
      }


    }

    return xmlDoc.documentElement;
  }

  //Journal ZAR Row Creator
  createRows3(data,body){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {

      var row = xmlDoc.createElement("env:row");
      xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

      if(data.items[index-1].amountZAR != "0"){
        var currency = xmlDoc.createElement("FCCurrency");
        var currency_text = xmlDoc.createTextNode("ZAR")//data.items[index-1].itemaccount[5]);
        xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
        currency.appendChild(currency_text);

      var item = xmlDoc.createElement("AccountCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
      item.appendChild(itemText);


      var total = xmlDoc.createElement("Debit");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountZAR);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
      total.appendChild(totalText);
      }
    }

    return xmlDoc.documentElement;
  }

  createRows33(data,body){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {

      var row = xmlDoc.createElement("env:row");
      xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

      if(data.items[index-1].amountZAR != "0"){
        var currency = xmlDoc.createElement("FCCurrency");
        var currency_text = xmlDoc.createTextNode("ZAR")//data.items[index-1].itemaccount[5]);
        xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
        currency.appendChild(currency_text);

      var item = xmlDoc.createElement("AccountCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
      item.appendChild(itemText);


      var total = xmlDoc.createElement("FCDebit");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountZAR);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
      total.appendChild(totalText);
      }
    }

    return xmlDoc.documentElement;
  }

  
  //Journal ZWD Row Creator
  createRows7(data,body){
   // console.log(data.items)
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {

      var row = xmlDoc.createElement("env:row");          
      xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);        
      
     

      if(data.items[index-1].amountZWD != "0"){
      // var currency = xmlDoc.createElement("FCCurrency");
      // var currency_text = xmlDoc.createTextNode("ZWD")//data.items[index-1].itemaccount[5]);
      // xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
      // currency.appendChild(currency_text);

      var item = xmlDoc.createElement("AccountCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])//data.items[index-1].itemaccount[5]);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
      item.appendChild(itemText);


      var total = xmlDoc.createElement("Debit");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountZWD);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
      total.appendChild(totalText);

      
      }
      
    }
    //console.log(xmlDoc.documentElement)
    return xmlDoc.documentElement;
  }

  //Journal BWP Row Creator
  createRows4(data,body){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {

      var row = xmlDoc.createElement("env:row");
      xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

      if(data.items[index-1].amountBWP != "0"){
        var currency = xmlDoc.createElement("FCCurrency");
        var currency_text = xmlDoc.createTextNode("BWP")//data.items[index-1].itemaccount[5]);
        xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
        currency.appendChild(currency_text);

      var item = xmlDoc.createElement("AccountCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
      item.appendChild(itemText);


      var total = xmlDoc.createElement("Debit");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountBWP);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
      total.appendChild(totalText);
      }
    }

    return xmlDoc.documentElement;
  }

  
  //Journal BWP Row Creator
  createRows44(data,body){

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(body,"text/xml");

    for (var index = 1; index <= data.items.length; ++index) {

      var row = xmlDoc.createElement("env:row");
      xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

      if(data.items[index-1].amountBWP != "0"){

        var currency = xmlDoc.createElement("FCCurrency");
        var currency_text = xmlDoc.createTextNode("BWP")//data.items[index-1].itemaccount[5]);
        xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
        currency.appendChild(currency_text);

      var item = xmlDoc.createElement("AccountCode");
      var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
      item.appendChild(itemText);


      var total = xmlDoc.createElement("FCDebit");
      var totalText = xmlDoc.createTextNode(data.items[index-1].amountBWP);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
      total.appendChild(totalText);
      }
    }

    return xmlDoc.documentElement;
  }

//Journal GBP Row Creator
createRows5(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {

    var row = xmlDoc.createElement("env:row");
    xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

    if(data.items[index-1].amountGBP != "0"){
      var currency = xmlDoc.createElement("FCCurrency");
      var currency_text = xmlDoc.createTextNode("GBP")//data.items[index-1].itemaccount[5]);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
      currency.appendChild(currency_text);

    var item = xmlDoc.createElement("AccountCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
    item.appendChild(itemText);


    var total = xmlDoc.createElement("Debit");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountGBP);
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}


//Journal GBP Row Creator
createRows55(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {

    var row = xmlDoc.createElement("env:row");
    xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

    if(data.items[index-1].amountGBP != "0"){
      var currency = xmlDoc.createElement("FCCurrency");
      var currency_text = xmlDoc.createTextNode("GBP")//data.items[index-1].itemaccount[5]);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
      currency.appendChild(currency_text);

    var item = xmlDoc.createElement("AccountCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
    item.appendChild(itemText);


    var total = xmlDoc.createElement("FCDebit");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountGBP);
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}

//Journal EUR Row Creator
createRows6(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {

    var row = xmlDoc.createElement("env:row");
    xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

    if(data.items[index-1].amountEUR != "0"){
      var currency = xmlDoc.createElement("FCCurrency");
      var currency_text = xmlDoc.createTextNode("EUR")//data.items[index-1].itemaccount[5]);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
      currency.appendChild(currency_text);

    var item = xmlDoc.createElement("AccountCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
    item.appendChild(itemText);


    var total = xmlDoc.createElement("Debit");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountEUR);
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}


//Journal EUR Row Creator
createRows66(data,body){

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(body,"text/xml");

  for (var index = 1; index <= data.items.length; ++index) {

    var row = xmlDoc.createElement("env:row");
    xmlDoc.getElementsByTagName("JournalEntries_Lines")[0].appendChild(row);

    if(data.items[index-1].amountEUR != "0"){
      var currency = xmlDoc.createElement("FCCurrency");
      var currency_text = xmlDoc.createTextNode("EUR")//data.items[index-1].itemaccount[5]);
      xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(currency);
      currency.appendChild(currency_text);

    var item = xmlDoc.createElement("AccountCode");
    var itemText = xmlDoc.createTextNode(data.items[index-1].itemaccount[0])
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(item);
    item.appendChild(itemText);


    var total = xmlDoc.createElement("FCDebit");
    var totalText = xmlDoc.createTextNode(data.items[index-1].amountEUR);
    xmlDoc.getElementsByTagName("env:row")[index-1].appendChild(total);
    total.appendChild(totalText);
    }
  }

  return xmlDoc.documentElement;
}


  errorAlert(errorMessage)
   {
    this.loader.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Remittance Add Failed',
      subTitle: errorMessage,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  formateDate(date){
    let newdate = "";

/*
    let  year = parseDate(date).year.toString();
    let month = parseDate(date).month.toString();
    let monthcheck = parseDate(date).month;
    let daycheck = parseDate(date).day;
    let day = parseDate(date).day.toString();

    if(monthcheck < 10){
      newmonth = "0"+month;
      if(daycheck < 10){
        newday = "0"+day;
      }else{
        newday = day;
      }
    }else{
      newmonth = month;
    }
*/
   // newdate = year+newmonth+newday;

   for (let index = 0; index < 1; index++) {

     newdate = date.replace('-','');
   }
   return newdate;
  }

}
