import { RestapiserviceProvider } from './../../providers/restapiservice/restapiservice';
import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the UpdatepastorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updatepastor',
  templateUrl: 'updatepastor.html',
})
export class UpdatepastorPage {
  newuser = {
    name: '',
    nationalid: '',
    driversL: '',
    passport: '',
    sex: '',
    married: '',
    cell: '',
    email: '',
    image: 'http://10.0.0.16:3001/zaoga/hq/images/avatar.png',
    dateofbirth: '',
    graduationdate:'',
    ordinationdate:'',
    ceatedUser:'',
    marrageofficer: '',
    profile:'',
    post: "Pastor",
    rank: '',
    deployment: {
      ndistrict: 'Not Deployed',
      nprovince: 'Not Deployed',
      ncountry: 'Not Deployed'
    }
  }
  employeeDetails;
  file:File;
 // @ViewChild('myInput') myInput: ElementRef;
  constructor(private elem: ElementRef,public restapi:RestapiserviceProvider, public couchservice:CouchdbProvider, public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.employeeDetails = this.navParams.get('userdetails');
    //console.log(this.employeeDetails);
    this.newuser.rank = this.employeeDetails.users.rank;
    this.newuser.name = this.employeeDetails.users.name;
    this.newuser.cell = this.employeeDetails.users.cell;
    this.newuser.email = this.employeeDetails.users.email;
    this.newuser.driversL = this.employeeDetails.users.driversL;
    this.newuser.image = this.employeeDetails.users.image;
    this.newuser.passport = this.employeeDetails.users.passport;
    this.newuser.sex = this.employeeDetails.users.sex;
    this.newuser.married = this.employeeDetails.users.married;
    this.newuser.nationalid = this.employeeDetails.users.nationalid;
    this.newuser.dateofbirth = this.employeeDetails.users.dateofbirth;
    this.newuser.graduationdate = this.employeeDetails.users.graduationdate;
    this.newuser.ordinationdate = this.employeeDetails.users.ordinationdate;
    this.newuser.ceatedUser = this.employeeDetails.users.ceatedUser;
    this.newuser.marrageofficer = this.employeeDetails.users.ismarriageofficer;
    this.newuser.profile = this.employeeDetails.users.profile;

    this.newuser.deployment.ndistrict = this.employeeDetails.users.deployment.ndistrict;
    this.newuser.deployment.nprovince = this.employeeDetails.users.deployment.nprovince;
    this.newuser.deployment.ncountry = this.employeeDetails.users.deployment.ncountry;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatepastorPage');
  }

  closeModel(){
    
            this.viewCtrl.dismiss();
  }

  changeListener($event): void {
    this.file = $event.target.files;
    
    this.newuser.image = 'http://46.17.237.158:3001/zaogaclick/images/'+ encodeURI(this.file[0].name);
    
  }

  addUser(event){
    let files = this.elem.nativeElement.querySelector('#file').files;
    let formData = new FormData();
    let file = files[0];
    console.log(file);
    if(file){
     formData.append('file',file, file.name);
    
    
    this.couchservice.update({_id:this.employeeDetails._id,_rev:this.employeeDetails._rev,users:this.newuser});
    this.restapi.uploadImageD(formData);
    this.viewCtrl.dismiss();

    }else{
      this.couchservice.update({_id:this.employeeDetails._id,_rev:this.employeeDetails._rev,users:this.newuser});
      
      this.viewCtrl.dismiss();
    }
    
  }

}
