import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the UnknownlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unknownlist',
  templateUrl: 'unknownlist.html',
})
export class UnknownlistPage {
  userDetails = {
    currency: "",
    amount: "",
    comment: "",
    cardcode: "",
    cardcode2: "",
    cardname: "",
    cardname2: "",
    paymentDate: "",
    bankref: ""
  }
  filteredusers = [];
  temparr = [];
  sessionID;
  BPCode;
  BPName;
  accountCode;
  constructor(public modelCtrl: ModalController, public sapserve:SapservicesProvider, public alertCtrl:AlertController, public restservice:RestapiserviceProvider, public viewCtrl : ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.sessionID = this.navParams.get('sessionID');
    this.userDetails.cardcode = this.navParams.get('BPCode');
    this.BPName = this.navParams.get('BPName');
    this.userDetails.cardcode2 = this.userDetails.cardcode;
    

    this.restservice.loadPayments(this.BPName).then((res:any) => {
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

        if((v.docentry.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.currency.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.docstate.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.amount.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.paymentDate.toLowerCase().indexOf(q.toLowerCase())) > -1){
           return true;
        }
      return false;

    })
  }

  profile(data){
    this.viewCtrl.dismiss(data);
   }


updateUser(data){
  //console.log(data);
  let modal = this.modelCtrl.create('UpdatePage',{userdetails: data });
  modal.onDidDismiss(data => {
    this.filteredusers = [];
    this.temparr = [];


    this.restservice.loadPayments(this.BPName).then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;


    })
  });
  modal.present();
}
deleteUser(data){


  let modal = this.modelCtrl.create('DeletepastorPage',{userdetails: data });
  modal.onDidDismiss(data => {
    this.filteredusers = [];
    this.temparr = [];


    this.restservice.loadPayments(this.BPName).then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;


    })
  });
  modal.present();
}

  addUser(){
    this.presentPrompt();
       
    
  }
  closeModel(){
    
    this.viewCtrl.dismiss();
}




presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Create Payment',
    inputs: [
      {
        name: 'currency',
        placeholder: 'ZWD,USD,ZAR,BWP,GBP,EUR'
      },
      
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
        name: 'amount',
        placeholder: 'Payment Amount',
        type: 'number'
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
          if (data.currency && data.amount && data.comment && data.paymentDate.length > 7  && data.paymentDate.length < 9 && data.bankref) {
            if(data.currency == "ZWD" || data.currency == "zwd"){
              this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','ZWD').then((res:any) => {
                this.accountCode = res[0].accountCode;
                
                
                this.userDetails.currency = data.currency;
                this.userDetails.amount = data.amount;
                this.userDetails.comment = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.bankref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payBP(this.sessionID,this.userDetails,this.accountCode,'ZWD');
                
    
               
              });

            }
            else if(data.currency == "USD" || data.currency == "usd"){
              this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','USD').then((res:any) => {
                this.accountCode = res[0].accountCode;
                
                
                this.userDetails.currency = data.currency;
                this.userDetails.amount = data.amount;
                this.userDetails.comment = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.bankref = data.bankref;
                this.userDetails.cardname = this.BPName;
                //console.log(this.userDetails);
                this.sapserve.payBP(this.sessionID,this.userDetails,this.accountCode,'USD');
                
    
               
              });

            }
            else if(data.currency == "ZAR" || data.currency == "zar"){
              this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','ZAR').then((res:any) => {
                this.accountCode = res[0].accountCode;
                

                this.userDetails.currency = data.currency;
                this.userDetails.amount = data.amount;
                this.userDetails.comment = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.bankref = data.bankref;
                this.userDetails.cardname = this.BPName;
                
                this.sapserve.payBP(this.sessionID,this.userDetails,this.accountCode,'ZAR');
                
    
              });
            }
            else if(data.currency == "BWP" || data.currency == "bwp"){
              this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','BWP').then((res:any) => {
                this.accountCode = res[0].accountCode;
                

                this.userDetails.currency = data.currency;
                this.userDetails.amount = data.amount;
                this.userDetails.comment = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.bankref = data.bankref;
                this.userDetails.cardname = this.BPName;
                
                this.sapserve.payBP(this.sessionID,this.userDetails,this.accountCode,'BWP');
                
    
               
              });
            }
            else if(data.currency == "GBP" || data.currency == "gbp"){
              this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','GBP').then((res:any) => {
                this.accountCode = res[0].accountCode;
  

                this.userDetails.currency = data.currency;
                this.userDetails.amount = data.amount;
                this.userDetails.comment = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.bankref = data.bankref;
                this.userDetails.cardname = this.BPName;
                
                this.sapserve.payBP(this.sessionID,this.userDetails,this.accountCode,'GBP');
                
    
              });
            }
            else if(data.currency == "EUR" || data.currency == "eur"){
              this.userDetails.cardcode2 = this.userDetails.cardcode+"_001";
              this.restservice.loadAccountCodes('External Bank','EUR').then((res:any) => {
                this.accountCode = res[0].accountCode;

                this.userDetails.currency = data.currency;
                this.userDetails.amount = data.amount;
                this.userDetails.comment = data.comment;
                this.userDetails.paymentDate = data.paymentDate;
                this.userDetails.bankref = data.bankref;
                this.userDetails.cardname = this.BPName;

                this.sapserve.payBP(this.sessionID,this.userDetails,this.accountCode,'EUR');
                
    
                
                
              });
              
            }else{
              this.sapserve.errorAlert('Please enter a valid currency eg : USD or zwd!');
              return false;
            }
            
            setTimeout(() => { 
              this.filteredusers = [];
              this.temparr = []; 
              this.restservice.loadPayments(this.BPName).then((res:any) => {
                this.filteredusers = res;
                this.temparr = res;
              })
          }, 2000);
          } else {
            this.sapserve.errorAlert('Please fill in all the fields correctly and try again!');
            return false;
          }
        }
      }
    ]
  });
  alert.present();
                this.userDetails.cardcode2 = this.userDetails.cardcode;
                this.userDetails.cardname = this.BPName;
                this.userDetails.cardname = "";
                this.userDetails.comment = "";
                this.userDetails.currency = "";
                this.userDetails.amount = "";
                this.userDetails.paymentDate = "";
                this.userDetails.bankref = "";
}



}
