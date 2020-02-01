import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the AddeducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addeducation',
  templateUrl: 'addeducation.html',
})
export class AddeducationPage {
  deploypastor = {
    id: '',
    name: '',
    coursename: '',
    school:'',
    DateStart: '',
    DateEnd:'',
    attachment: ''
  }
  pastordetails;
  deployed = true;
  buttonText = "Full Attachment";
  constructor(public alertCtrl:AlertController, public couchservice:CouchdbProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.pastordetails = this.navParams.get('pastordetails');
   
    this.deploypastor.id = this.pastordetails._id;
    this.deploypastor.name = this.pastordetails.users.name;
  
    console.log(this.deploypastor);
    console.log(this.pastordetails.users.missions);
    if(this.pastordetails.users.missions == undefined){
     
    }else{
      
    }
  }

  endDeploy(){
   
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddeducationPage');
  }

  closeModel(){
    
    this.viewCtrl.dismiss();
  }

  
  addUser(event){
   
      
      let id = new Date().toISOString();
     // this.pastordetails.users.missions = this.deploypastor;
      //console.log(this.deploypastor);
      this.couchservice.deploy({_id:id,education:this.deploypastor});
      //this.couchservice.update({_id:this.pastordetails._id,_rev:this.pastordetails._rev ,users:this.pastordetails.users});
      
      this.viewCtrl.dismiss();
  

  }

  presentAlert(errorMeaages) {
    let alert = this.alertCtrl.create({
      title: 'Runtime Error',
      subTitle: errorMeaages,
      buttons: ['Dismiss']
    });
    alert.present();
  }

}
