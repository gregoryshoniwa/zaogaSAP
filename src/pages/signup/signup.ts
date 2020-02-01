import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';

import { LoginPage } from './../login/login';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { importType } from '@angular/compiler/src/output/output_ast';
import Sha from 'sha.js';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser = {
    emailAddress: '',
    userPassword: '',
    userName: '',
    contacts: '',
    fulladdress: ''
  }
  constructor(public alertCtrl:AlertController, public restservice:RestapiserviceProvider, public loadingCtrl: LoadingController, public toastCtrl:ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createuser(){
    this.restservice.loadLoginUsers(this.newuser.emailAddress).then((data) => {
     // console.log(data);
      if(data != 0){
        let message = "Sorry but "+this.newuser.emailAddress+" already has an account, Please use another email."
        this.presentAlert2(message);
       
      }else{
        this.restservice.loadLoginUsers2(this.newuser.userName).then((data2) => {
          if(data2 != 0){
            let message = "Sorry but "+this.newuser.userName+" already has an account, Please use another username."
        this.presentAlert2(message);
          }else{
            let passCry = Sha("sha1");
            let NewPass = passCry.update(this.newuser.userPassword,'utf8').digest('hex');
           // console.log(NewPass);
           this.newuser.userPassword = NewPass; 
           this.restservice.addUser(this.newuser);

           this.newuser.userName = "";
           this.newuser.userPassword = "";
           this.newuser.emailAddress = "";
          }
        }).catch((e) =>{
          this.presentAlert2(e);
        });
        
      }
    }).catch((e) =>{
      this.presentAlert2(e);
    });
   
  }

  goback(){
    this.navCtrl.setRoot(LoginPage);
  }

  login2(){
    this.navCtrl.setRoot("Login2Page");
  }
 presentAlert2(error) {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
