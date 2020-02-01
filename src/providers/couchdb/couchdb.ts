import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
/*
  Generated class for the CouchdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CouchdbProvider {
  data: any;
  db: any;
  remote: any;
  districts: any;
  constructor(public http: HttpClient) {
    console.log('Hello CouchdbProvider Provider');

    this.db = new PouchDB('zaogalink');
 
    this.remote = 'http://10.0.0.16:5984/zaogalink';
 
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
 
    this.db.sync(this.remote, options);
 

  }

  getDeployment(pastorid): Observable<any> {
    //return this.http.get('http://127.0.0.1:5984/couchblog/_design/posts/_view/by_date_published').map(res => res.json());
    return Observable.from(this.db.query('getPosts/deployment',{
      include_docs:true,
      key:pastorid
    }));
 }
 getMission(pastorid): Observable<any> {
  //return this.http.get('http://127.0.0.1:5984/couchblog/_design/posts/_view/by_date_published').map(res => res.json());
  return Observable.from(this.db.query('getPosts/missions',{
    include_docs:true,
    key:pastorid
  }));
}
getEducation(pastorid): Observable<any> {
  //return this.http.get('http://127.0.0.1:5984/couchblog/_design/posts/_view/by_date_published').map(res => res.json());
  return Observable.from(this.db.query('getPosts/education',{
    include_docs:true,
    key:pastorid,
    attachemts:true
  }));
}


 getAllPastors(): Observable<any> {
  //return this.http.get('http://127.0.0.1:5984/couchblog/_design/posts/_view/by_date_published').map(res => res.json());
  return Observable.from(this.db.query('getPosts/pastors',{
    include_docs:true,
   
  }));
}

countAllPastors(): Observable<any> {
  return this.http.get('http://10.0.0.16:5984/zaogalink/_design/getPosts/_view/countPastors?key=[%22Pastor%22]');
  /*
  return Observable.from(this.db.query('getPosts/countPastors',{
    key:'Pastor'
    
  }));*/
}

 loadDistricts(){
    
  if (this.districts) {
    return Promise.resolve(this.districts);
  }
 
  return new Promise(resolve => {
   
    this.db.query('getPosts/districts',{
 
      include_docs: true
 
    }).then((result) => {
 
      this.districts = [];
 
      let docs = result.rows.map((row) => {
        this.districts.push(row.doc);
      });
 
      resolve(this.districts);
 
      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        console.log(change);
        if(change.doc.districts){
          this.handleDistrictChange(change);
        }
        //
        //console.log(change);
      });
 
    }).catch((error) => {
 
      console.log(error);
 
    });
 
  });
 
 }
  
  get() {
    
  if (this.data) {
    return Promise.resolve(this.data);
    
  }
 
  return new Promise(resolve => {
   
    this.db.query('getPosts/pastors',{
 
      include_docs: true,
      
 
    }).then((result) => {
 
      this.data = []; 
 
      let docs = result.rows.map((row) => {
        this.data.push(row.doc);
      });
 
      resolve(this.data);
 
      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        //console.log(change);
        if(change.doc.users){
          this.handleChange(change);
        }
        if(change.deleted){
          this.handleChange(change);
        }
        //
        
      });
     // this.data = [];
    }).catch((error) => {
 
      console.log(error);
 
    });
 
  });
 
  }
 
  addDistricts(district){
    this.db.post(district);
  }
  create(todo){
    this.db.put(todo);
  }
/*
  createPastor(todo,image){
    this.db.put(todo,function(err,res){
      this.db.putAttachment(res.id + '/image', res.rev, image, contentType, callback);
    });
  }
*/
  createDistrict(todo){
    this.db.put(todo).then((res) =>{
      //console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  } 

  deploy(todo){
    this.db.put(todo).then((res) =>{
      console.log(res);
      //this.get();
    }).catch((err) => {
      console.log(err);
    });
  }
   
  updateDeploy(todo,deploymentInfo){
    this.db.put(todo).then((res) =>{
      this.deploy(deploymentInfo);
    }).catch((err) => {
      console.log(err);
    });
  }

  update(todo){
    this.db.put(todo).then((res) =>{
     
    }).catch((err) => {
      console.log(err);
    });
  }
   
  delete(todo){
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }
  handleDistrictChange(change){
    
    let changedDoc = null;
    let changedIndex = null;
   
    this.districts.forEach((doc, index) => {
   
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
   
    });
   
    //A document was deleted
    if(change.deleted){
      this.districts.splice(changedIndex, 1);
    }
    else {
   
      //A document was updated
      if(changedDoc){
        this.districts[changedIndex] = change.doc;
      }
   
      //A document was added
      else {
        this.districts.push(change.doc);
      }
   
    }
    
   
    }
  
  handleChange(change){
    
  let changedDoc = null;
  let changedIndex = null;
 
  this.data.forEach((doc, index) => {
 
    if(doc._id === change.id){
      changedDoc = doc;
      changedIndex = index;
    }
 
  });
 
  //A document was deleted
  if(change.deleted){
    this.data.splice(changedIndex, 1);
  }
  else {
 
    //A document was updated
    if(changedDoc){
      this.data[changedIndex] = change.doc;
    }
 
    //A document was added
    else {
      this.data.push(change.doc);
      //this.countAllPastors();
      //console.log(change.doc)
      //console.log(this.data)
    }
 
  }
  
 
  }



}
