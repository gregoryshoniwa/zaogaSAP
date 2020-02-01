import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ImageviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imageview',
  templateUrl: 'imageview.html',
})
export class ImageviewPage {
  image;
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.image = this.navParams.get('imageUrl');
    console.log(this.image);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageviewPage');
  }
  closeModel(){
    
    this.viewCtrl.dismiss();
}

}
