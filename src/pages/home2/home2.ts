import { CouchdbProvider } from './../../providers/couchdb/couchdb';
import { LoginPage } from './../login/login';
import { PopmenuComponent } from './../../components/popmenu/popmenu';
import { GlobleProvider } from './../../providers/globle/globle';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, AlertController } from 'ionic-angular';
import Chart from 'chart.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {
  username;
  PageName = "Pastors Page";
  toggler;
  Pastors = true;
  Elders = false;
  Deacons = false;
  Members = false;
  Finance = false;
  Council = false;

  doc : any;

  filteredusers = [];
  temparr = [];
  deploy;
  history;
  totalPastors;
  userData;
  pdfObject = null;
  constructor(public alertCtrl:AlertController, public couchservice:CouchdbProvider,  public popover: PopoverController,public modelCtrl:ModalController, public global:GlobleProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.username = this.navParams.get('userID');
    this.userData = this.navParams.get('userData');
    console.log(this.userData);
    this.global.setUserID(this.username);
   //var myChart = new Chart(ctx, {});

   
  }

  createPdf(){
    var body = [];
    body.push(['Full Name', 'Post', 'Sex', 'District','Province','Country' ]);
    for (let i = 0; i < this.filteredusers.length; i += 1) {
	    var row = [
		    
	      
			    this.filteredusers[i].users.name,
          this.filteredusers[i].users.rank,
          this.filteredusers[i].users.sex,
          this.filteredusers[i].users.deployment.ndistrict,
          this.filteredusers[i].users.deployment.nprovince,
          this.filteredusers[i].users.deployment.ncountry,
		    
	    ];
    	body.push(row);
    }
    console.log(body);

    var docDefinition = { 
      pageOrientation: 'landscape',
      pageSize: 'LETTER',
		  
      footer: function(currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
      header: 'ZAOGA Pastors Database',function(currentPage, pageCount, pageSize) {
    // you can apply any logic and return any valid pdfmake element
 
      return [
        { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
        { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
      ]
      },

      content: [{
        layout: 'lightHorizontalLines',
        table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ 110, 100, 'auto', 150,100,100 ],
  
        body: body
        
      }
    }
       
      ]
  };
    pdfMake.createPdf(docDefinition).download('Report.pdf', function () { alert('done');});
  }

 
  
  searchuserp(searchbar){
    
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if(q.trim() == ''){
      return;
    }
    this.filteredusers = this.filteredusers.filter((v) => {

        if((v.users.sex.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.users.name.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.users.deployment.ndistrict.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.users.deployment.nprovince.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.users.deployment.ncountry.toLowerCase().indexOf(q.toLowerCase())) > -1 || (v.users.rank.toLowerCase().indexOf(q.toLowerCase())) > -1){
           return true;
        }
      return false;

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home2Page');
    console.log(this.filteredusers);
    this.couchservice.countAllPastors().subscribe((data) =>{
      console.log(data.rows[0].value);
      this.totalPastors = data.rows[0].value
    })
    
    this.couchservice.get().then((data) =>{
      //console.log(data[0].doc);
      
        this.filteredusers = data;
        this.temparr = this.filteredusers;
      
      
      
    });

    
  }

  deploymentList(pastor){
    this.couchservice.getDeployment(pastor).subscribe((data) =>{
      console.log(data.rows);
    });
  } 

  presentAlert(errorMeaages) {
    let alert = this.alertCtrl.create({
      title: 'Runtime Error',
      subTitle: errorMeaages,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  createDistrict(){
    let modal = this.modelCtrl.create('DistrictaddPage');
    modal.onDidDismiss(data => {
      
    });
    modal.present();
  }

  create(){
  let modal = this.modelCtrl.create('AddpastorPage');
  modal.onDidDismiss(data => {
    this.couchservice.countAllPastors().subscribe((data) =>{
      console.log(data.rows[0].value);
      this.totalPastors = data.rows[0].value
    })
    /*
    this.filteredusers = [];
      this.temparr = [];

    this.couchservice.getAllPastors().subscribe((data) =>{
      console.log(data.rows);
      this.filteredusers = data.rows;
      this.temparr = this.filteredusers;
      
    });*/
  });
  modal.present();
        
  }
 
  update(todo){
    console.log(todo);
    
    let modal = this.modelCtrl.create('UpdatepastorPage',{userdetails:todo},{cssClass:"my-modal"});
     modal.onDidDismiss(data => {
  
      this.ionViewDidLoad();
  });
  modal.present();
 
    
  }

  rank(pastordata){
    let alert = this.alertCtrl.create();
      alert.setTitle('Please choose option');
  
      alert.addInput({
        type: 'radio',
        label: 'Bishop',
        value: 'Bishop',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Overseer',
        value: 'Overseer',
        checked: false
      });

      alert.addInput({
        type: 'radio',
        label: 'District Pastor',
        value: 'District Pastor',
        checked: false
      });

      
  
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          pastordata.users.rank = data;
          console.log(pastordata);
         this.couchservice.update({_id:pastordata._id,_rev:pastordata._rev,users:pastordata.users});
        }
      });
      alert.present();

  }
 
  choiceAlert(pastorDetails){
    
      let alert = this.alertCtrl.create();
      alert.setTitle('Please choose option');
  
      alert.addInput({
        type: 'radio',
        label: 'View Profile',
        value: 'Profile',
        checked: true
      });

      alert.addInput({
        type: 'radio',
        label: 'Deploy Pastor',
        value: 'Deploy',
        checked: false
      });

      alert.addInput({
        type: 'radio',
        label: 'Deployment History',
        value: 'History',
        checked: false
      });

      alert.addInput({
        type: 'radio',
        label: 'Promote/Demote',
        value: 'Ranking',
        checked: false
      });

      alert.addInput({
        type: 'radio',
        label: 'Short Term Missionary',
        value: 'Missions',
        checked: false
      });
  
      alert.addInput({
        type: 'radio',
        label: 'Add Education',
        value: 'Education',
        checked: false
      });

     
  
  
  
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
         
          if(data == "Profile"){
            this.couchservice.getDeployment(pastorDetails._id).subscribe((data) =>{
              
             
              if(data.rows.length != 0){
                this.couchservice.getMission(pastorDetails._id).subscribe((data1) =>{
                 if(data1.rows.length != 0){
                   this.couchservice.getEducation(pastorDetails._id).subscribe((data2) =>{
                    if(data2.rows.length != 0){
                      let modal = this.modelCtrl.create('ProfilePage',{educationData:data2.rows,missionData:data1.rows, deploydata:data.rows,pastordetails:pastorDetails},{cssClass:"my-modal"});
                      modal.onDidDismiss(data => {
        
                      });
                      modal.present();
                    }else{
                      let modal = this.modelCtrl.create('ProfilePage',{educationData:"Non",missionData:data1.rows, deploydata:data.rows,pastordetails:pastorDetails},{cssClass:"my-modal"});
                       modal.onDidDismiss(data => {
        
                      });
                      modal.present();
                    }
                   });
                  
                 }else{

                  this.couchservice.getEducation(pastorDetails._id).subscribe((data2) =>{
                    if(data2.rows.length != 0){
                      let modal = this.modelCtrl.create('ProfilePage',{educationData:data2.rows,missionData:"Non", deploydata:data.rows,pastordetails:pastorDetails},{cssClass:"my-modal"});
                      modal.onDidDismiss(data => {
        
                      });
                      modal.present();
                    }else{
                      let modal = this.modelCtrl.create('ProfilePage',{educationData:"Non",missionData:"Non", deploydata:data.rows,pastordetails:pastorDetails},{cssClass:"my-modal"});
                       modal.onDidDismiss(data => {
        
                      });
                      modal.present();
                    }
                   });

                  
                 }
                });
               
              }else{
                this.couchservice.getEducation(pastorDetails._id).subscribe((data2) =>{
                  if(data2.rows.length != 0){
                    let modal = this.modelCtrl.create('ProfilePage',{educationData:data2.rows,missionData:"Non", deploydata:"Non",pastordetails:pastorDetails},{cssClass:"my-modal"});
                    modal.onDidDismiss(data => {
      
                    });
                    modal.present();
                  }else{
                    let modal = this.modelCtrl.create('ProfilePage',{educationData:"Non",missionData:"Non", deploydata:"Non",pastordetails:pastorDetails},{cssClass:"my-modal"});
                     modal.onDidDismiss(data => {
      
                    });
                    modal.present();
                  }
                 });

                
               }
              });
            
          }

          if(data == "Deploy"){
            let modal = this.modelCtrl.create('DeploypastorPage',{pastordetails:pastorDetails});
            modal.onDidDismiss(data => {
              
           
            });
             modal.present();
          }

          if(data == "Missions"){
            let modal = this.modelCtrl.create('MissionsdeploymentPage',{pastordetails:pastorDetails});
            modal.onDidDismiss(data => {
              
           
            });
             modal.present();
          }
          if(data == "Education"){
            let modal = this.modelCtrl.create('AddeducationPage',{pastordetails:pastorDetails});
            modal.onDidDismiss(data => {
              
           
            });
             modal.present();
          }
          

          if(data == "History"){
            this.couchservice.getDeployment(pastorDetails._id).subscribe((data) =>{
              console.log(data.rows);
              
              if(data.rows.length != 0){
                let modal = this.modelCtrl.create('DeployhistoryPage',{deploydata:data.rows});
                modal.onDidDismiss(data => {
      
                });
                 modal.present();
              }else{
                this.presentAlert('Sorry no deployment records.')
              }
            
             
            });
            
          }
          if(data == "Ranking"){
            this.rank(pastorDetails);
          }
        }
      });
      alert.present();
    }
  

  delete(todo){
    if(this.userData.authorization == "P"){
      this.couchservice.delete(todo);
      this.couchservice.countAllPastors().subscribe((data) =>{
        console.log(data.rows[0].value);
        this.totalPastors = data.rows[0].value
      });
    }else{
      this.presentAlert('Sorry but you are not authorized to delete a user, contact IT Department!')
    }
    
  }
 

  TogglePage(data){
    //this.PageName = "";
    if(data == "Pastors Page"){
      this.PageName = data;
      this.Pastors = true;
      this.Elders = false;
      this.Deacons = false;
      this.Members = false;
      this.Finance = false;
      this.Council = false;
    }
    if(data == "Elders Page"){
      this.PageName = data;
      this.Pastors = false;
      this.Elders = true;
      this.Deacons = false;
      this.Members = false;
      this.Finance = false;
      this.Council = false;
    }
    
    if(data == "Deacons Page"){
      this.PageName = data;
      this.Pastors = false;
      this.Elders = false;
      this.Deacons = true;
      this.Members = false;
      this.Finance = false;
      this.Council = false;
    }
    
    if(data == "Members Page"){
      this.PageName = data;
      this.Pastors = false;
      this.Elders = false;
      this.Deacons = false;
      this.Members = true;
      this.Finance = false;
      this.Council = false;
    }
    
    if(data == "Finance Page"){
      this.PageName = data;
      this.Pastors = false;
      this.Elders = false;
      this.Deacons = false;
      this.Members = false;
      this.Finance = true;
      this.Council = false;
    }
    
    if(data == "Council Report"){
      this.PageName = data;
      this.Pastors = false;
      this.Elders = false;
      this.Deacons = false;
      this.Members = false;
      this.Finance = false;
      this.Council = true;
    }
    
    
    
  }

  
  changeToggler(){
    if(this.toggler == ""){
      this.toggler = "nav_open";
      //console.log(this.toggler);
    }
    else{
      this.toggler = "";
     //console.log(this.toggler);
    }
  }

  changeToggler2(){
    if(this.toggler == ""){
      this.toggler = "topbar_open";
      //console.log(this.toggler);
    }
    else{
      this.toggler = "";
      //console.log(this.toggler);
    }
  }

  
  presentPopover(myEvent) {
    let popover = this.popover.create(PopmenuComponent);
    popover.present({
      ev:myEvent
    });

    popover.onDidDismiss(popoverData => {
      console.log(popoverData.item);
      if(popoverData.item == "Account Determination"){
        let modal = this.modelCtrl.create('AccountdPage');
           modal.onDidDismiss(data => {
    
   
         });
         modal.present();
      }
      if(popoverData.item == "User Settings"){
        let modal = this.modelCtrl.create('UsersPage');
           modal.onDidDismiss(data => {
    
   
         });
         modal.present();
      }
      if(popoverData.item == "Logout"){
        this.navCtrl.setRoot(LoginPage);
      }
    });

  }
  


}
