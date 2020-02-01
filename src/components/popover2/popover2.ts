import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the Popover2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover2',
  templateUrl: 'popover2.html'
})
export class Popover2Component {

  
  text: string;
  items:any;
  constructor(public viewCtrl: ViewController) {
    this.items = [
      {item:'New Tree'},
      {item:'New Link'},
      {item:'Settings'}
      
    ]
  }
  itemClick(item){
    this.viewCtrl.dismiss(item);
  }
}
