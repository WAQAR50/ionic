import { Component } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';*/
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SmoelenboekDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-smoelenboek-detail',
  templateUrl: 'smoelenboek-detail.html'
})
export class SmoelenboekDetailPage {
  public userDetail:any;
  public userCompany:any;
  public errorMsg:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
    this.userDetail = navParams.get('user');

    if(this.userDetail.data.user_company != null){
      this.userCompany = this.userDetail.data.user_company;
    }else{
      this.userCompany = false;
    }

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
    console.log('ionViewDidLoad SmoelenboekDetailPage');
  }

}
