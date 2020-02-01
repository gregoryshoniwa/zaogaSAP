import { GlobleProvider } from './../../providers/globle/globle';


import {Http,Headers} from '@angular/http';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, AlertController, LoadingController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loader: Loading;
  credentials = {
    email: '',
    password: ''
  }
  db = "ZAGOA_CLICK";
  url = "http://10.0.0.36/B1WS/Service.asmx";
  public xmlItems : any;
  constructor(public globle:GlobleProvider, public http: Http,public alertCtrl:AlertController, public loadingCtrl: LoadingController, public toastCtrl:ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  passwordRest(){

  }
  signin(cred){
    let headers = new Headers();

    let body = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:log="LoginService">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
       '<log:Login>'+
          '<!--Optional:-->'+
          '<log:DatabaseServer>ZAOGA_SAP_TEST</log:DatabaseServer>'+
          '<!--Optional:-->'+
          '<log:DatabaseName>ZAGOA_TEST</log:DatabaseName>'+
          '<!--Optional:-->'+
          '<log:DatabaseType>dst_MSSQL2012</log:DatabaseType>'+
          '<!--Optional:-->'+
          '<log:DatabaseUsername>sa</log:DatabaseUsername>'+
          '<!--Optional:-->'+
          '<log:DatabasePassword>JesusChrist@@11</log:DatabasePassword>'+
          '<!--Optional:-->'+
          '<log:CompanyUsername>'+this.credentials.email+'</log:CompanyUsername>'+
          '<!--Optional:-->'+
          '<log:CompanyPassword>'+this.credentials.password+'</log:CompanyPassword>'+
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
      try{
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data,"text/xml");
      var results = xmlDoc.getElementsByTagName("SessionID")[0].childNodes[0].nodeValue
      console.log(results);

        if(results != "Unable to connect with the specified username and or password"){
          this.presentLoading();
          this.navCtrl.setRoot(HomePage,{sessionID:results,userID:this.credentials.email,userPass:this.credentials.password});
          this.loader.dismiss();
        }else{
          this.presentAlert();
        }
      }catch(e){
        this.presentAlert2(e);
      }
      this.globle.setSessionID(results);

    });
   }


  signup(){
    this.navCtrl.setRoot("SignupPage");
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
