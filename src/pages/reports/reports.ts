import { Chart } from 'chart.js';
import { GlobleProvider } from './../../providers/globle/globle';
import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Component, ViewChild  } from '@angular/core';
import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { PopmenuComponent } from './../../components/popmenu/popmenu';
import { NavController, Loading, NavParams, LoadingController, ModalController, AlertController, DateTime, PopoverController, IonicPage } from 'ionic-angular';
import {Http,Headers} from '@angular/http';

/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  loader: Loading;
  sessionID;
  username;
  chartOptions : any;
  toggler = "";
  toggler2 = "";
  numberOfOpenInoives = [];
  queryArray = [];
  count = [];
  massages;
  remittanceData = {
    cardcode: "",
    cardname : "",
    description : "",
    date : DateTime,
    duedate: "",
    items: {},
    cashbreakdown: {},
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
    owner: ""

  };
  reportType;
  ReportYear;
  BarChart = [];
  ReportData;
  Bpname;
  barChartLabels:string[] = [];
  barChartData:number[] = [];
  barChartType:string = 'bar';
  AmountData;
  

  @ViewChild('barCanvas') barCanvas;

  barChart: any;

  constructor(public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,public globleservice : GlobleProvider, public restservice:RestapiserviceProvider,public modelCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams,public popover: PopoverController) {
    this.sessionID = this.globleservice.getSessionID();
    this.username = this.navParams.get('userID');



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');

  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Processing Remittance...",
      enableBackdropDismiss: true,
      duration: 5000
    });
    this.loader.present();
   
  }


executeReport(selection){
   this.queryArray = [];
   this.AmountData = [0,0,0,0,0,0,0,0,0,0,0,0];
  if(selection == 'Outstanding'){
    let modal = this.modelCtrl.create('ReportmodelPage',{sessionID: this.sessionID,reportType: this.reportType });
    modal.onDidDismiss(data => {
    if(data){
      this.presentLoading();
      console.log(data);
      this.ReportData = data;
      this.Bpname = data.bpname;
      this.ReportYear = data.year;
      this.ChartValues(data);
    }


  });
  modal.present();
  }
  if(selection == 'Charts'){
    this.queryArray = [];
    this.AmountData = [0,0,0,0,0,0,0,0,0,0,0,0];
    let modal = this.modelCtrl.create('ReportmodelPage',{sessionID: this.sessionID,reportType: this.reportType });
    modal.onDidDismiss(data => {
    if(data){
      console.log(data);
      this.presentLoading();
      this.ReportData = data;
      this.Bpname = data.bpname;
      this.ReportYear = data.year;
      this.ChartValues(data);
    }

     // console.log(data);
  });
  modal.present();
  }
  if(selection == 'Positions'){
    this.queryArray = [];
    this.AmountData = [0,0,0,0,0,0,0,0,0,0,0,0];
    let modal = this.modelCtrl.create('ReportmodelPage',{sessionID: this.sessionID,reportType: this.reportType });
    modal.onDidDismiss(data => {
    if(data){
      console.log(data);
      this.presentLoading();
      this.ReportData = data;
      this.Bpname = data.bpname;
      this.ReportYear = data.year;
      this.ChartValues(data);
    }


  });
  modal.present();
  }
}
  viewInoives(){
    this.numberOfOpenInoives = [];
    this.count = [];
    this.massages;
      this.restservice.loadInvoicesAllOpen().then((data) =>{
        this.numberOfOpenInoives.push(data);
        this.count = this.numberOfOpenInoives[0];
        this.massages = this.count.length;
        console.log(data);
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
          console.log(data);
         });
       // console.log(data);
    });
    modal.present();

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

  ChartValues(Qdata){
    this.queryArray = [];
    this.AmountData = [0,0,0,0,0,0,0,0,0,0,0,0];
    if(this.barChart){
      this.barChart.destroy();
    }

    if(Qdata.currency == 'ZWD'){
      console.log("ZWD");
      let query = "SELECT T0.[DocNum], T0.[DocDate], T0.[CreateDate], T0.[CardName],T0.[DocCurr],  T2.[DocNum] as 'Inoive Number', T3.[Dscription],T3.[LineTotal] FROM ORCT T0  INNER JOIN RCT2 T1 ON T0.DocNum = T1.DocNum left join OINV T2 on t1.docentry = t2.docentry INNER JOIN INV1 T3 ON T2.DocEntry = T3.DocEntry WHERE T0.[DocDate] between '01/01/"+Qdata.year+"' and '12/31/"+Qdata.year+"' and (T0.[CashAcct] = '_SYS00000001288' or T0.[TrsfrAcct] = '_SYS00000001288') and T0.[Canceled] = 'N' and  T0.[CardName] LIKE '"+Qdata.bpname+"' and T3.[Dscription] LIKE '"+Qdata.itemname+"' ORDER BY  T0.[DocDate]";

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


      this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {
        var queryObj = {
          date:'',
          amount: 0
        };
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");
        var items = xmlDoc.querySelectorAll("row");
        for (var index = 0; index < items.length; index++) {
          var element = parseFloat(items[index].childNodes[7].textContent).toFixed(2);

          this.queryArray.push({date:Number(items[index].childNodes[1].textContent),amount:parseFloat(element)});
        }
        //console.log(this.queryArray);
        for(var months = 0;months < this.queryArray.length;months++){
          console.log(this.queryArray[months].date);
         
               if(this.queryArray[months].date <= Number(Qdata.year+'0131')){
                  this.AmountData[0] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0231')){
                  this.AmountData[1] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0331')){
                  this.AmountData[2] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0431')){
                  this.AmountData[3] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0531')){
                  this.AmountData[4] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0631')){
                  this.AmountData[5] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0731')){
                  this.AmountData[6] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0831')){
                  this.AmountData[7] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0931')){
                  this.AmountData[8] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'1031')){
                  this.AmountData[9] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'1131')){
                  this.AmountData[10] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'1231')){
                  this.AmountData[11] = this.queryArray[months].amount;
                }
        
        }
        this.loader.dismiss();
       // console.log(this.AmountData);
        this.barChart = new Chart(this.barCanvas.nativeElement, {

          type: 'bar',
          data: {
              labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
              datasets: [{
                label: Qdata.itemname + ' : '+ Qdata.currency+' ',
                data: this.AmountData,
                backgroundColor: [

                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(54, 162, 235, 0.2)'

                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }

      });
      
      });
    }
    
    if(Qdata.currency == 'USD'){
      let query = "SELECT T0.[DocNum], T0.[DocDate], T0.[CreateDate], T0.[CardName],T0.[DocCurr],  T2.[DocNum] as 'Inoive Number', T3.[Dscription],T3.[LineTotal] FROM ORCT T0  INNER JOIN RCT2 T1 ON T0.DocNum = T1.DocNum left join OINV T2 on t1.docentry = t2.docentry INNER JOIN INV1 T3 ON T2.DocEntry = T3.DocEntry WHERE T0.[DocDate] between '01/01/"+Qdata.year+"' and '12/31/"+Qdata.year+"' and (T0.[CashAcct] = '_SYS00000004344' or T0.[TrsfrAcct] = '_SYS00000004344') and T0.[Canceled] = 'N' and  T0.[CardName] LIKE '"+Qdata.bpname+"' and T3.[Dscription] LIKE '"+Qdata.itemname+"' ORDER BY  T0.[DocDate]";


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


      this.http.post('http://10.0.0.36/B1WS/Service.asmx',body,{headers:headers})
      .map(res => res.text())
      .subscribe(data => {

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");
        var items = xmlDoc.querySelectorAll("row");
        for (var index = 0; index < items.length; index++) {
          var element = parseFloat(items[index].childNodes[7].textContent).toFixed(2);

          this.queryArray.push({date:Number(items[index].childNodes[1].textContent),amount:parseFloat(element)});
        }


for(var months = 0;months < this.queryArray.length;months++){
          console.log(this.queryArray[months].date);
         
               if(this.queryArray[months].date <= Number(Qdata.year+'0131')){
                  this.AmountData[0] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0231')){
                  this.AmountData[1] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0331')){
                  this.AmountData[2] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0431')){
                  this.AmountData[3] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0531')){
                  this.AmountData[4] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0631')){
                  this.AmountData[5] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0731')){
                  this.AmountData[6] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0831')){
                  this.AmountData[7] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'0931')){
                  this.AmountData[8] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'1031')){
                  this.AmountData[9] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'1131')){
                  this.AmountData[10] = this.queryArray[months].amount;
                }
                else if(this.queryArray[months].date <= Number(Qdata.year+'1231')){
                  this.AmountData[11] = this.queryArray[months].amount;
                }
        
        }
       // console.log(this.AmountData);
       this.loader.dismiss();
          this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'bar',
            data: {
                labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                datasets: [{
                  label: Qdata.itemname + ' : '+ Qdata.currency+' ',
                  data: this.AmountData,
                  backgroundColor: [

                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'

                  ],
                  borderColor: [

                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(54, 162, 235, 1)',

                  ],
                  borderWidth: 1
              }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }

        });
         
        //console.log(this.queryArray);
      });

    }


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

  navigator(page){
    if(page == 'Remittance'){
      this.navCtrl.popToRoot();
      page = null;
    }
    if(page == 'CashHandOver'){
      this.navCtrl.push('LatePage',{sessionID:this.sessionID,userID:this.username});
      page = null;
    }
    
    // if(page == 'Reports'){
    //  // this.navCtrl.setRoot('ReportsPage',{sessionID:this.sessionID});
    //   page = null;
    // }
  }

}
