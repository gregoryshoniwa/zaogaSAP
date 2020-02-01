import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddpastorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpastor',
  templateUrl: 'addpastor.html',
})
export class AddpastorPage {
  newuser = {
    name: '',
    nationalid: '',
    driversL: '',
    passport: '',
    sex: '',
    married: '',
    cell: '',
    email: '',
    image: '',
    dateofbirth: '',
    graduationdate:'',
    ordinationdate:'',
    ceatedUser:'',
    marrageofficer: '',
    post: "Pastor",
    rank: "Non",
    profile:"",
    deployment: {
      ndistrict: 'Not Deployed',
      nprovince: 'Not Deployed',
      ncountry: 'Not Deployed'
    }
  }
  username; 
  images = [];
  imagecallback;
  @ViewChild('myInput') myInput: ElementRef;
  constructor(private elem: ElementRef,public restservice:RestapiserviceProvider, public couchservice:CouchdbProvider, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.username = this.navParams.get('username');
     this.newuser.ceatedUser = this.username;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpastorPage');
  }
  closeModel(){
    
            this.viewCtrl.dismiss();
  }
  addUser(event){
    if(this.newuser.image == ''){
      this.newuser.image = 'http://46.17.237.158:3001/zaoga/hq/images/avatar.png';

      let id = new Date().toISOString();
      this.couchservice.create({_id:id ,users:this.newuser});
      //console.log(this.newuser);
      this.viewCtrl.dismiss();
    }else{
      let files = this.elem.nativeElement.querySelector('#file').files;
      let formData = new FormData();
      let file = files[0];
      formData.append('file',file, file.name);
      //this.restservice.uploadImageD(formData,this.newuser);
      console.log(formData);
      /*
      this.viewCtrl.dismiss();

      let id = new Date().toISOString();
      this.couchservice.create({_id:id ,users:this.newuser});
      //console.log(this.newuser);
      this.viewCtrl.dismiss();
      */
    }
  

  }


}
