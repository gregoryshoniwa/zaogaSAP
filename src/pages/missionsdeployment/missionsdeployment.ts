import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the MissionsdeploymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-missionsdeployment',
  templateUrl: 'missionsdeployment.html',
})
export class MissionsdeploymentPage {
  deploypastor = {
    id: '',
    name: '',
    city:'',
    country: '',
    job: '',
    deploymentDate: new Date().toDateString(),
    deployUser: '',
    state:''
  }
  pastordetails;
  deployed = true;
  buttonText = "End Deployment";
  constructor(public alertCtrl:AlertController, public couchservice:CouchdbProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.pastordetails = this.navParams.get('pastordetails');
    this.deploypastor.deployUser = this.navParams.get('username');
    this.deploypastor.id = this.pastordetails._id;
    this.deploypastor.name = this.pastordetails.users.name;
  
    console.log(this.deploypastor);
    console.log(this.pastordetails.users.missions);
    if(this.pastordetails.users.missions == undefined){
      this.deploypastor.state = "Starting new missionary work";
    }else{
      this.deploypastor.state = "Currently a missionary";
      this.deployed = false;
      this.deploypastor.city = this.pastordetails.users.missions.city;
      this.deploypastor.country = this.pastordetails.users.missions.country;
      this.deploypastor.job = this.pastordetails.users.missions.job;
    }
  }


  endDeploy(){
    if(this.deploypastor.state == "Currently a missionary"){
      this.deploypastor.state = "Finished missionary work";
      this.buttonText = "Undo State"
     // console.log(this.deploypastor.state);
    }
    else{
      this.deploypastor.state = "Currently a missionary";
      this.buttonText = "End Deployment"
     // console.log(this.deploypastor.state);
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MissionsdeploymentPage');
  }

  closeModel(){
    
    this.viewCtrl.dismiss();
  }

  
  addUser(event){
    if(this.deploypastor.state == "Currently a missionary"){
      this.presentAlert('Sorry first click end deployment before adding record, Pastor is still in missionary working currently.');
    }else{
      this.deploypastor.state == "Started missionary work"
      let id = new Date().toISOString();
      this.pastordetails.users.missions = this.deploypastor;
      console.log(this.deploypastor);
      this.couchservice.deploy({_id:id,missions:this.deploypastor});
      this.couchservice.update({_id:this.pastordetails._id,_rev:this.pastordetails._rev ,users:this.pastordetails.users});
      
      this.viewCtrl.dismiss();
    }
   

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
