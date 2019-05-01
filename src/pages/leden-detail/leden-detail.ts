import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the LedenDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leden-detail',
  templateUrl: 'leden-detail.html'
})
export class LedenDetailPage {
  public companyDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.companyDetail = navParams.get('company');
  }

  openLink(link:string){
    window.open(link, '_system', 'location=yes');
    return false;
  }

  callTo(num:string){
    window.open('tel:'+num);
    return false;
  }

  mailTo(mail:string){
    window.open('mailto:'+mail);
    return false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LedenDetailPage');
  }

}
