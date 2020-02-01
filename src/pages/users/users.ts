import { SapservicesProvider } from './../../providers/sapservices/sapservices';
import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  userDetails = {
    userName: "",
    emailAddress: "",
    userPosition: "",
    userPassword: ""
  }
  filteredusers = [];
  temparr = [];
  constructor(public modelCtrl: ModalController, public sapserve:SapservicesProvider, public alertCtrl:AlertController, public restservice:RestapiserviceProvider, public viewCtrl : ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.restservice.loadUsers().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;
     //console.log(res);
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

        if((v.userName.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.emailAddress.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.userPosition.toLowerCase().indexOf(q.toLowerCase())) > -1 ){
           return true;
        }
      return false;

    })
  }

  profile(data){
    let modal = this.modelCtrl.create('ProfilePage',{userdetails: data });
    modal.onDidDismiss(data => {
  
  
    });
    modal.present();
   }


updateUser(data){
  console.log(data);
  let modal = this.modelCtrl.create('UpdatePage',{userdetails: data });
  modal.onDidDismiss(data => {
    this.filteredusers = [];
    this.temparr = [];


    this.restservice.loadUsers().then((res:any) => {
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


    this.restservice.loadUsers().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;


    })
  });
  modal.present();
}

  addUser(){
    this.presentPrompt();
    this.filteredusers = [];
    this.temparr = [];


    this.restservice.loadUsers().then((res:any) => {
      this.filteredusers = res;
      this.temparr = res;


    })
    
  }
  closeModel(){
    
    this.viewCtrl.dismiss();
}


presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Create Church Users',
    inputs: [
      {
        name: 'email',
        placeholder: 'Email Address'
      },
      {
        name: 'username',
        placeholder: 'Username'
      },
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      },
      {
        name: 'position',
        placeholder: 'Church Position'
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
        text: 'User Creation',
        handler: data => {
          if (data.username && data.password && data.email && data.position) {
            this.userDetails.userName = data.username;
            this.userDetails.emailAddress = data.email;
            this.userDetails.userPassword = data.password;
            this.userDetails.userPosition = data.position;

            this.restservice.addUser(this.userDetails); 

            this.userDetails.userName = "";
            this.userDetails.emailAddress = "";
            this.userDetails.userPassword = "";
            this.userDetails.userPosition = "";
            // logged in!
          } else {
            this.sapserve.errorAlert('Please fill in all the fields!');
            return false;
          }
        }
      }
    ]
  });
  alert.present();
}

}
