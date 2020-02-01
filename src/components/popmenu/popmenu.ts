import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the PopmenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popmenu',
  templateUrl: 'popmenu.html'
})
export class PopmenuComponent {

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
