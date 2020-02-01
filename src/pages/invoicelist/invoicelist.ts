import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the InvoicelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoicelist',
  templateUrl: 'invoicelist.html',
})
export class InvoicelistPage {
  userDetails = {
    currency: "",
    amount: "",
    description: "",
    cardcode: "",
    cardcode2: "",
    cardname: "",
    cardname2: "",
    paymentDate: "",
    ref: "",
    totalZWD: "",
    totalUSD: "",
    totalBWP: "",
    totalZAR: "",
    totalGBP: "",
    totalEUR: "",
    paymentType: "Transfer",
    id: ""
  }
  filteredusers = [];
  temparr = [];
  sessionID;
  BPCode;
  BPName;
  accountCode;
  journalXml;
  constructor(public modelCtrl: ModalController, public sapserve:SapservicesProvider, public alertCtrl:AlertController, public restservice:RestapiserviceProvider, public viewCtrl : ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.sessionID = this.navParams.get('sessionID');
    this.userDetails.cardcode = this.navParams.get('BPCode');
    this.BPName = this.navParams.get('BPName');
    this.userDetails.cardcode2 = this.userDetails.cardcode;
    

    // this.restservice.loadInvoices(this.BPName).then((res:any) => {
    //   this.filteredusers = res;
    //   this.temparr = res;
     
    //  //console.log(this.filteredusers);
    // })
    this.restservice.loadInvoicesAllOpen().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;
     
     //console.log(this.filteredusers);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }
  
  searchuserp(searchbar){
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {

        if((v.CardName.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.InvoiceNumber.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.InvoiceAmount.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.InvoiceCurrency.toLowerCase().indexOf(q.toLowerCase())) > -1){
           return true;
        }
      return false;

    })
  }

  profile(data){
    this.viewCtrl.dismiss(data);
   }


updateUser(data){
  this.presentPrompt(data);
}

  
  closeModel(){
    
    this.viewCtrl.dismiss();
}


async presentPrompt(InvoiceDetails) {
  let alert = this.alertCtrl.create({
    title: 'Pay Remittance',
    inputs: [
            
      {
        name: 'paymentDate',
        placeholder: 'Date : YYYYMMDD',
        type: 'number'
      },
      
      {
        name: 'bankref',
        placeholder: 'Bank Ref'
        
      },
      {
        name: 'comment',
        placeholder: 'Journal Remarks'
        
      }
    ],
    
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Add',
        handler: data => {
          if (data.comment && data.paymentDate && data.bankref) {
            if(InvoiceDetails.InvoiceCurrency == "ZWD"){
             
              this.restservice.loadAccountCodes('External Bank','ZWD').then((res:any) => {
                this.accountCode = res[0].accountCode;

                this.restservice.loadJournalXml(InvoiceDetails.InvoiceNumber,'ZWD').then((res:any) => {
                  this.journalXml = res[0].JournalXml;
                  this.userDetails.id = 
                  this.userDetails.cardcode2 = res[0].CardCode;
                 if(this.accountCode && this.journalXml){
                
                this.userDetails.currency = InvoiceDetails.InvoiceCurrency;
                this.userDetails.totalZWD = InvoiceDetails.InvoiceAmount;
                this.userDetails.description = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.ref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payInvoiceZWDLate(this.sessionID,InvoiceDetails.InvoiceNumber,this.userDetails,this.userDetails.paymentDate,this.userDetails.paymentDate,this.accountCode,this.journalXml);
                
                 }
               
              });
            });

            }

            if(InvoiceDetails.InvoiceCurrency == "USD"){
              // this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','USD').then((res:any) => {
                this.accountCode = res[0].accountCode;

                this.restservice.loadJournalXml(InvoiceDetails.InvoiceNumber,'USD').then((res:any) => {
                  this.journalXml = res[0].JournalXml;
                  this.userDetails.id = res[0].id;
                  this.userDetails.cardcode2 = res[0].CardCode;
                 if(this.accountCode && this.journalXml){
                
                this.userDetails.currency = InvoiceDetails.InvoiceCurrency;
                this.userDetails.totalUSD = InvoiceDetails.InvoiceAmount;
                this.userDetails.description = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.ref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payInvoiceUSDLate(this.sessionID,InvoiceDetails.InvoiceNumber,this.userDetails,this.userDetails.paymentDate,this.userDetails.paymentDate,this.accountCode,this.journalXml);
                
                 }
               
              });
            });

            }


            if(InvoiceDetails.InvoiceCurrency == "ZAR"){
              // this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','ZAR').then((res:any) => {
                this.accountCode = res[0].accountCode;
                

                this.restservice.loadJournalXml(InvoiceDetails.InvoiceNumber,'ZAR').then((res:any) => {
                  this.journalXml = res[0].JournalXml;
                  this.userDetails.id = res[0].id;
                  this.userDetails.cardcode2 = res[0].CardCode;
                 if(this.accountCode && this.journalXml){
                
                this.userDetails.currency = InvoiceDetails.InvoiceCurrency;
                this.userDetails.totalZAR = InvoiceDetails.InvoiceAmount;
                this.userDetails.description = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.ref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payInvoiceZARLate(this.sessionID,InvoiceDetails.InvoiceNumber,this.userDetails,this.userDetails.paymentDate,this.userDetails.paymentDate,this.accountCode,this.journalXml);
                
                 }
               
              });
            });

            }
            if(InvoiceDetails.InvoiceCurrency == "BWP"){
              // this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','BWP').then((res:any) => {
                this.accountCode = res[0].accountCode;
                
                  this.restservice.loadJournalXml(InvoiceDetails.InvoiceNumber,'BWP').then((res:any) => {
                  this.journalXml = res[0].JournalXml;
                  this.userDetails.id = res[0].id;
                  this.userDetails.cardcode2 = res[0].CardCode;
                 if(this.accountCode && this.journalXml){
                
                this.userDetails.currency = InvoiceDetails.InvoiceCurrency;
                this.userDetails.totalBWP = InvoiceDetails.InvoiceAmount;
                this.userDetails.description = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.ref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payInvoiceBWPLate(this.sessionID,InvoiceDetails.InvoiceNumber,this.userDetails,this.userDetails.paymentDate,this.userDetails.paymentDate,this.accountCode,this.journalXml);
                
                 }
               
              });
            });

            }
            if(InvoiceDetails.InvoiceCurrency == "GBP"){
              // this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','GBP').then((res:any) => {
                this.accountCode = res[0].accountCode;
                

                this.restservice.loadJournalXml(InvoiceDetails.InvoiceNumber,'GBP').then((res:any) => {
                  this.journalXml = res[0].JournalXml;
                  this.userDetails.id = res[0].id;
                  this.userDetails.cardcode2 = res[0].CardCode;
                 if(this.accountCode && this.journalXml){
                
                this.userDetails.currency = InvoiceDetails.InvoiceCurrency;
                this.userDetails.totalGBP = InvoiceDetails.InvoiceAmount;
                this.userDetails.description = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.ref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payInvoiceGBPLate(this.sessionID,InvoiceDetails.InvoiceNumber,this.userDetails,this.userDetails.paymentDate,this.userDetails.paymentDate,this.accountCode,this.journalXml);
                
                 }
               
              });
            });

            }
            if(InvoiceDetails.InvoiceCurrency == "EUR"){
              // this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','EUR').then((res:any) => {
                this.accountCode = res[0].accountCode;

                
                this.restservice.loadJournalXml(InvoiceDetails.InvoiceNumber,'EUR').then((res:any) => {
                  this.journalXml = res[0].JournalXml;
                  this.userDetails.id = res[0].id;
                  this.userDetails.cardcode2 = res[0].CardCode;
                 if(this.accountCode && this.journalXml){
                
                this.userDetails.currency = InvoiceDetails.InvoiceCurrency;
                this.userDetails.totalEUR = InvoiceDetails.InvoiceAmount;
                this.userDetails.description = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.ref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payInvoiceEURLate(this.sessionID,InvoiceDetails.InvoiceNumber,this.userDetails,this.userDetails.paymentDate,this.userDetails.paymentDate,this.accountCode,this.journalXml);
                
                 }
               
              });
            });

            }
           setTimeout(() => { 
              this.filteredusers = [];
                this.temparr = []; 
                this.restservice.loadInvoicesAllOpen().then((res:any) => {
                  this.filteredusers = res;
                  this.temparr = res;
                 
                 //console.log(this.filteredusers);
                })
            }, 2000);
            // logged in!
          } else {
            this.sapserve.errorAlert('Please fill in all the fields!');
            return false;
          }

        }
      }
    ]
  });
 await alert.present();
                this.userDetails.cardcode2 = this.userDetails.cardcode;
                this.userDetails.cardname = this.BPName;
                this.userDetails.cardname = "";
                this.userDetails.description = "";
                this.userDetails.currency = "";
                this.userDetails.amount = "";
                this.userDetails.paymentDate = "";
                this.userDetails.ref = "";

}



}
