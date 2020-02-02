import { GlobleProvider } from './../globle/globle';
//import { FileTransfer,FileUploadOptions } from '@ionic-native/file-transfer';
import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';



/*
  Generated class for the RestapiserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiserviceProvider {
  udata : any;
  ddata : any;
  idata : any;
  udata_filtered: any;
  ddata_filtered: any;
  apiUrl = 'http://10.0.0.36:1337/'
  constructor(public globle: GlobleProvider, public http: Http,public toastCtrl: ToastController) {
    console.log('Hello RestapiserviceProvider Provider');
  }


  uploadImageD(image){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    //let userdetails = userData;

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/imageupload/uploadFile',image)
    .map(res => res.json())
    .subscribe(data =>{
      //this.adduserToast();
      //this.updateUserImageD(userData.id,'http://46.17.237.158:3001/web/images/'+ data.file[0].filename);
      console.log(data.file[0]);
    });


  }

  updateUserImageD(userObject,imageurl){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {

      image: imageurl
    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/pastors/'+userObject,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userImageToast();
    });



  }

  loadUsersImage(image){
    if(this.idata){
      return Promise.resolve(this.idata);
    }
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:3003/api/img/'+image.filename,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.idata = data;

        resolve(this.idata)
      })
    });
  }

  loadUsers(){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    });

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkuser',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }

  loadLoginUsers(data){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    });

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkuser?emailAddress='+data,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata.length)
      })
    });
  }

  loadLoginUsers2(data){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    });

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkuser?userName='+data,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata.length)
      })
    });
  }

  loadLoginUsers3(data,pass){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    });

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkuser?userName='+data+'&userPassword='+pass,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }


  loadPayments(userdata){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkunknownpayments?bpname='+userdata+'&docstate=Open&sort=createdAt DESC',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }

  loadInvoices(userdata){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linklateinvoice?CardName='+userdata+'&ApprovalStatus=Approved&Status=Open&sort=createdAt DESC',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }

  loadInvoicesAllOpen(){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linklateinvoice?Status=Open&ApprovalStatus=Approved&sort=createdAt DESC',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }



  loadAccounts(){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkaccounts',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }

  loadDistricts(){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/districts',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;

        resolve(this.udata)
      })
    });
  }

  loadDepartment(){
    if(this.ddata){
      return Promise.resolve(this.ddata);
    }
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/departments',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.ddata = data;
        resolve(this.ddata)
      })
    });
  }

  loadReports(userdata){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/deployhistory?userid='+userdata+'&sort=createdAt DESC',opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.ddata = data;
        resolve(this.ddata)
      })
    });
  }

  loadAccountCodes(accountType,accountCurrency){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linkaccounts?accountType='+accountType+'&accountCurrency='+accountCurrency,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.ddata = data;
        resolve(this.ddata)
      })
    });
  }

  loadJournalXml(invoicenumber,currency){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://10.0.0.36:1337/linklateinvoice?InvoiceNumber='+invoicenumber+'&InvoiceCurrency='+currency,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.ddata = data;
        resolve(this.ddata)
      })
    });
  }


  addUnknownPayment(userObject,docentry){
   // console.log(userObject);
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      amount: userObject.amount,
      currency: userObject.currency,
      comment: userObject.comment,
      docentry: docentry,
      bpname: userObject.cardname,
      bankref: userObject.bankref,
      paymentDate: userObject.paymentDate,
      docstate: "Open"
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/linkunknownpayments',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.adduserToast();
      console.log(data);
    });



  }

  addCashRemittance(data){
    // console.log(userObject);
     let opt: RequestOptions;
     let myHeaders: Headers = new Headers;
     let body = {
       RemittanceData:JSON.stringify(data)
     };
 
     myHeaders.append('Content-type','application/json');
     opt = new RequestOptions({
       headers: myHeaders
     })
 
     this.http.post('http://10.0.0.36:1337/linkcashbreakdown',JSON.stringify(body),opt)
     .map(res => res.json())
     .subscribe(data =>{
       this.adduserToast();
       //console.log(data);
     });
 
 
 
   }

  sendReceipt(docdata){
    //console.log(userObject);
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:8081/sendReceipt',JSON.stringify(docdata),opt)
    .map(res => res.json())
    .subscribe(data =>{
      if(data.success){
        this.emailSentToast();
        console.log(data);
      }else{
        this.emailFailToast();
        console.log(data);
      }
      
    });



  }

  addUser(userObject){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      userName: userObject.userName,
      userPosition: "Non",
      emailAddress: userObject.emailAddress,
      userPassword: userObject.userPassword,
      district: "Non",
      province: "Non",
      country: "Non",
      post: "Non",
      ministry: "Non",
      dob: "Non",
      sex: "Non",
      authorization: "O"
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/linkuser',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.adduserToast();
     // console.log(data);
    });



  }

  addAccount(userObject){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      accountCode: userObject.accountCode,
      accountName: userObject.accountName,
      accountType: userObject.accountType,
      accountCurrency: userObject.accountCurrency

    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/linkaccounts',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.adduserToast();
      console.log(data);
    });
  }

  addInvoice(userObject,InvoiceNumber,InvoiceAmount,InvoiceCurrency,CardCode){
    return new Promise((resolve) => {
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      CardCode: CardCode,
      CardName: userObject.cardname,
      InvoiceNumber: InvoiceNumber,
      InvoiceAmount: InvoiceAmount,
      InvoiceCurrency: InvoiceCurrency,
      Status: "Open" ,
      JournalXml: "Non",
      ApprovalStatus: "Approved",
      ApprovedBy: "Non"
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/linklateinvoice',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.adduserToast();
      //console.log(data);
      resolve(data.id);
    });
  });
  }

  updateInvoiceXml(data,xml){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      JournalXml: xml

    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/linklateinvoice/'+data,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userupdateToast();
    });

  }


  updateInvoiceStatus(data){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      Status: "Closed"

    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/linklateinvoice/'+data,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userupdateToast();
    });

  }


  updateInvoiceApprovalStatus(data){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      ApprovalStatus: "Approved",
      ApprovedBy: this.globle.userID

    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/linklateinvoice/'+data,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userupdateToast();
    });

  }



  updateAccountState(data){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      docstate: "Closed"

    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/linkunknownpayments/'+data,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userupdateToast();
    });



  }


  updateAccount(userObject,data){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      accountCode: userObject.accountCode,
      accountName: userObject.accountName,
      accountType: userObject.accountType,
      accountCurrency: userObject.accountCurrency

    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/linkaccounts/'+data,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userupdateToast();
    });



  }

  addPastor(userObject){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      name: userObject.name,
      nationalid: userObject.nationalid,
      driversL: userObject.driversL,
      passport: userObject.passport,
      sex: userObject.sex,
      cell: userObject.cell,
      married: userObject.married,
      email: userObject.email,
      image: userObject.image,
      dateofbirth: userObject.dateofbirth,
      graduationdate:userObject.graduationdate,
      ordinationdate:userObject.ordinationdate,
      ceatedUser:userObject.ceatedUser,
      ismarriageofficer:userObject.marrageofficer
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/pastors',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.adduserToast();
      console.log(data);
      this.deployPastor(data);
    });



  }


  addDistricts(userObject){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      district: userObject.district,
      province: userObject.province,
      country: userObject.country,
      createdUser: userObject.username
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/districts',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.addDistrictToast();
      console.log(data);
    });



  }

  deployPastorHistory(userObject){
    console.log(userObject);
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      userid: userObject.id,
      name: userObject.name,
      district: userObject.district,
      province: userObject.province,
      country: userObject.country,
      deployUser: userObject.updateUser
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/deployhistory',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{

      this.adduserToast();
      console.log(data);
    });


  }

  deployPastor(userObject){
    //console.log(userObject);
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      district: 'Not Deployed Yet',
      province: 'Not Deployed Yet',
      country: 'Not Deployed Yet',
      createdUser: userObject.createdUser
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/pastors/'+userObject.id,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{

      //this.adduserToast();
      console.log(data);
    });



  }


  deployPastorUpate(userObject){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      district: userObject.ndistrict,
      province: userObject.nprovince,
      country: userObject.ncountry,
      updateUser: userObject.deployUser
    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/pastors/'+userObject.id,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.deployPastorHistory(data);
      //this.adduserToast();
      console.log(data);
    });



  }


  updateUser(userObject){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {

      name: userObject.name,
      nationalid: userObject.nationalid,
      driversL: userObject.driversL,
      passport: userObject.passport,
      sex: userObject.sex,
      cell: userObject.cell,
      married: userObject.married,
      email: userObject.email,
      image: userObject.image,
      dateofbirth: userObject.dateofbirth,
      graduationdate:userObject.graduationdate,
      ordinationdate:userObject.ordinationdate,
      ceatedUser:userObject.ceatedUser,
      ismarriageofficer: userObject.marrageofficer
    };
    console.log(body);
    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.put('http://10.0.0.36:1337/pastors/'+userObject.id,JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      //console.log(data);
      this.userupdateToast();
    });



  }



  addProfile(depObject,depSelected){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      name: depSelected,
      HOD: depObject.HOD,
      description: depObject.description,
      image: depObject.image,
      extention: depObject.extention,
      cell: depObject.cell,
      email: depObject.email

    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/departments',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.addprofileToast();
      console.log(data);
    });


  }

  addReport(userrecord,userdata){
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;
    let body = {
      name: userdata.name,
      userid: userdata.id,
      department: userdata.department,
      monday: userrecord.descriptionM,
      tuesday: userrecord.descriptionT,
      wednesday: userrecord.descriptionW,
      thursday: userrecord.descriptionTh,
      friday: userrecord.descriptionF,
      saturday: userrecord.descriptionSa,
      sunday: userrecord.descriptionSu

    };

    myHeaders.append('Content-type','application/json');
    opt = new RequestOptions({
      headers: myHeaders
    })

    this.http.post('http://10.0.0.36:1337/reports',JSON.stringify(body),opt)
    .map(res => res.json())
    .subscribe(data =>{
      this.addreportToast();
      console.log(data);
    });



  }



  deleteUsers(userData){

    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept','application/json;charset=utf-8');
    myHeaders.append('Content-type','application/json;charset=utf-8');
    opt = new RequestOptions({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.delete('http://10.0.0.36:1337/pastors/'+ userData,opt)
      .map(res => res.json())
      .subscribe(data =>{
        this.udata = data;
        this.userdeleteToast();
        resolve(this.udata)
      })
    });
  }

  userupdateToast() {
    const toast = this.toastCtrl.create({
      message: 'Record was updated successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }

  userdeleteToast() {
    const toast = this.toastCtrl.create({
      message: 'Pastor was deleted successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }

  adduserToast() {
    const toast = this.toastCtrl.create({
      message: 'Record was added successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }

  emailFailToast() {
    const toast = this.toastCtrl.create({
      message: 'Email Sending Failed',
      duration: 5000,
      position: 'bottom'
    });


    toast.present();
  }

  
  emailSentToast() {
    const toast = this.toastCtrl.create({
      message: 'Email Sent successfully',
      duration: 5000,
      position: 'bottom'
    });


    toast.present();
  }

  addDistrictToast(){
    const toast = this.toastCtrl.create({
      message: 'District was added successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }

  addprofileToast() {
    const toast = this.toastCtrl.create({
      message: 'User profile was added successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }

  addreportToast() {
    const toast = this.toastCtrl.create({
      message: 'User weekly report added successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }

  userImageToast(){
    const toast = this.toastCtrl.create({
      message: 'Image added successfully',
      duration: 3000,
      position: 'bottom'
    });


    toast.present();
  }


}
