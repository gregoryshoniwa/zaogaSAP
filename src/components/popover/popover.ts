import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  items:any;
  constructor(public viewCtrl: ViewController) {
    this.items = [
      {item:'User Settings'},
      {item:'Account Determination'},
      {item:'Logout'}
      
    ]
  }
  itemClick(item){
    this.viewCtrl.dismiss(item);
  }
}
