import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the DeploypastorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deploypastor',
  templateUrl: 'deploypastor.html',
})
export class DeploypastorPage {
  deploypastor = {
    id: '',
    name: '',
    deployUser:'',
    odistrict: '',
    oprovince: '',
    ocountry: '',
    ndistrict: '',
    nprovince: '',
    ncountry: '',
    deploymentDate: new Date().toDateString()
  }
  
  pastordetails;
  constructor(public modelCtrl:ModalController, public couchservice:CouchdbProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.pastordetails = this.navParams.get('pastordetails');
    this.deploypastor.deployUser = this.navParams.get('username');
    this.deploypastor.id = this.pastordetails._id;
    this.deploypastor.name = this.pastordetails.users.name;
    this.deploypastor.odistrict = this.pastordetails.users.deployment.ndistrict;
    this.deploypastor.oprovince = this.pastordetails.users.deployment.nprovince;
    this.deploypastor.ocountry = this.pastordetails.users.deployment.ncountry;
    console.log(this.deploypastor);
    console.log(this.pastordetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeployPage');
  }
  closeModel(){
    
            this.viewCtrl.dismiss();
  }

  addUser(event){
    let id = new Date().toISOString();
    this.pastordetails.users.deployment = this.deploypastor;
    console.log(this.pastordetails);
    this.couchservice.deploy({_id:id,deployment:this.deploypastor});
    this.couchservice.update({_id:this.pastordetails._id,_rev:this.pastordetails._rev ,users:this.pastordetails.users});
    
    this.viewCtrl.dismiss();

  }

  newdistrict(){
    let modal = this.modelCtrl.create('DistrictlistPage');
    modal.onDidDismiss(data => {
      console.log(data);
      if(data){
      this.deploypastor.ndistrict = data.districts.district;
      this.deploypastor.nprovince = data.districts.province;
      this.deploypastor.ncountry = data.districts.country;
      }
      
    });
    modal.present();
  }


}
