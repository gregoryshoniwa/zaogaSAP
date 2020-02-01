import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewinvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewinvoices',
  templateUrl: 'viewinvoices.html',
})
export class ViewinvoicesPage {
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
    

    this.restservice.loadInvoicesAllOpen().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;
     
     //console.log(this.filteredusers);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
    this.filteredusers = [];
    this.temparr = [];
    this.restservice.loadInvoicesAllOpen().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;
    })
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


async updateUser(data){
 // this.presentPrompt(data);
  await this.restservice.updateInvoiceApprovalStatus(data.id);
  setTimeout(() => { 
    this.filteredusers = [];
      this.temparr = []; 
      this.restservice.loadInvoicesAllOpen().then((res:any) => {
        this.filteredusers = res;
        this.temparr = res;
       
       //console.log(this.filteredusers);
      })
  }, 3000);


}

  
  closeModel(){
    
    this.viewCtrl.dismiss();
}


presentPrompt(InvoiceDetails) {
  let alert = this.alertCtrl.create({
    title: 'Approve Remittance',
    inputs: [
            
      {
        name: 'pin',
        placeholder: 'Enter Pin',
        type: 'number'
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
          if (data.pin == 1234) {
           this.restservice.updateInvoiceApprovalStatus(InvoiceDetails.id);
           this.restservice.loadInvoicesAllOpen().then((res:any) => {
            this.filteredusers = res;
            this.temparr = res;
          })
            // logged in!
          } else {
            this.sapserve.errorAlert('Please enter correct pin!');
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
                this.userDetails.description = "";
                this.userDetails.currency = "";
                this.userDetails.amount = "";
                this.userDetails.paymentDate = "";
                this.userDetails.ref = "";
}



}
