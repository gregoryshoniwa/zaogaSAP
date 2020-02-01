import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';
/*
  Generated class for the GlobleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobleProvider {
  public itemAcountNumber;
  public sessionID;
  public userID;
  constructor(public http: HttpClient) {
    console.log('Hello GlobleProvider Provider');
  }

  setAccountNumber(value) {
    this.itemAcountNumber = value;
  }

  setUserID(value) {
    this.userID = value;
  }

  getAccountNumber() {
    return this.itemAcountNumber;
  }

  setSessionID(value) {
    this.sessionID = value;
  }

  getSessionID() {
    return this.sessionID;
  }

  print(componentName) {
    var node = document.getElementById(componentName);

    domtoimage.toPng(node)
    .then(function (dataUrl) {
        var popup=window.open();
          popup.document.write('<img src=' + dataUrl + '>');
          popup.document.close();
          popup.focus();
          popup.print();
          popup.close();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }


}
