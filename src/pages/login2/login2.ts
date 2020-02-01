import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { GlobleProvider } from './../../providers/globle/globle';


import {Http,Headers} from '@angular/http';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import Sha from 'sha.js';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
})
export class Login2Page {
  loader: Loading;
  credentials = {
    email: '',
    password: ''
  }
  db = "ZAGOA_CLICK";
  url = "http://10.0.0.36/B1WS/Service.asmx";
  public xmlItems : any;
  constructor(public restservice:RestapiserviceProvider, public globle:GlobleProvider, public http: Http,public alertCtrl:AlertController, public loadingCtrl: LoadingController, public toastCtrl:ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
   
  }

  passwordRest(){
    
  }
  signin(){
    let passCry = Sha("sha1");
    let NewPass = passCry.update(this.credentials.password,'utf8').digest('hex');
           // console.log(NewPass);
    this.credentials.password = NewPass; 
    this.restservice.loadLoginUsers3(this.credentials.email,this.credentials.password).then((data) =>{
      console.log(data);
      if(data){
        this.navCtrl.setRoot("Home2Page",{userID:data[0].userName,userData:data[0]});
      }else{
        this.presentAlert();
      }
    }).catch((e) =>{
      this.presentAlert2(e);
    })
   }


  signup(){
    this.navCtrl.setRoot("LoginPage");
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading Account Data..."
    });
    this.loader.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: 'Unable to login to the system, please check you userID and password and try again',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentAlert2(error) {
    let alert = this.alertCtrl.create({
      title: 'Login Failed',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }
/*
  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Login failed, Check you credentials',
    duration: 3000,
    position: 'top'
  });
  }*/
}
