import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the Popover3Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover3',
  templateUrl: 'popover3.html'
})
export class Popover3Component {

  text: string;
  items:any;
  constructor(public viewCtrl: ViewController) {
    this.items = [
      {item:'New Meeting'},
      {item:'Settings'}
    ]
  }
  itemClick(item){
    this.viewCtrl.dismiss(item);
  }

}
