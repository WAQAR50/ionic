import { Component, ViewChild } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';*/
import { Platform, NavController, NavParams, LoadingController, App, Nav } from 'ionic-angular';
//import { Location } from '@angular/common';
import { Location } from '@angular/common';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { AgendaPage } from '../agenda/agenda';
import { ContactPage } from '../contact/contact';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
import { HomePage } from '../home/home';
import { MembershipPage } from '../membership/membership';
import { NieuwsbriefRegistrerenPage } from '../nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';


//import { StatusBar, Splashscreen } from 'ionic-native';
//import { SmoelenboekDetailPage } from '../smoelenboek-detail/smoelenboek-detail';

/*
  Generated class for the Smoelenboek page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bestuur',
  templateUrl: '/bestuur.html'
})
export class BestuurPage {

  @ViewChild(Nav) nav: Nav;
  public team: any;
  public searchUsers: any;
  public errorMsg: any;
  //public userDetail: any = SmoelenboekDetailPage;

  public lastSearchString: any = '';

  public usersOffset: number = 0;

  constructor(public location: Location, public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public loadingCtrl: LoadingController, public localStorage: Storage,
    public platform: Platform, public app: App) {

    this.localStorage.get('teamData').then((teamData) => {
      this.team = teamData.data;
      // console.log( 'waqar', this.team.data.user_company);
      this.usersOffset = 5;
      this.usersOffset = teamData.usersOffset;
      this.searchUsers = this.team;
    }).catch(() => {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });
      // Show the popup
      loadingPopup.present();

      this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/bestuur_data').map(res => res.json()).subscribe(data => {
        this.team = data;
        console.log('dsfsdf', this.team);
        this.usersOffset = 5;
        this.localStorage.set(`teamData`, { 'data': data, 'usersOffset': this.usersOffset });
        //this.localStorage.set(`teamData`, {'data': data});
        this.searchUsers = this.team;
        loadingPopup.dismiss();
      },
        err => {
          loadingPopup.dismiss();
          this.errorMsg = 'er is iets fout gegaan!';
        });
    });


  }

  doRefresh(refresher) {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();

    this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/bestuur_data').map(res => res.json()).subscribe(data => {
      this.team = data;
      console.log('giugigiu', this.team);
      this.usersOffset = 5;
      this.localStorage.set(`teamData`, { 'data': data, 'usersOffset': this.usersOffset });
      //this.localStorage.set(`teamData`, {'data': data});
      this.searchUsers = this.team;
      refresher.complete();
      loadingPopup.dismiss();
    },
      err => {
        refresher.complete();
        loadingPopup.dismiss();
        this.errorMsg = 'er is iets fout gegaan!';
      });
  }

  mailTo(mail: string) {
    window.open('mailto:' + mail);
    return false;
  }
  public ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      //this.navCtrl.pop();
      
      //let nav = this.app.getActiveNav();
     // let activeView = nav.getActive().name;

      // console.log(this.navCtrl);
      // console.log(this.location);
      // console.log(this.goBack());
      // console.log(this.location.back());
      var routes = JSON.parse(localStorage.getItem('routes'));
      routes.shift();
      localStorage.setItem("routes", JSON.stringify(routes));
      //console.log('routes 0-', routes[0]);
      //console.log('All', routes);
      //this.navCtrl.setRoot(routes[0]);
      // this.location.go(routes[0]);

        if (routes[0] === 'AgendaPage') {
          this.navCtrl.setRoot(AgendaPage);
        }else if(routes[0] === 'ContactPage'){
          this.navCtrl.setRoot(ContactPage);
        } else if(routes[0] === 'FotoalbumPage'){
          this.navCtrl.setRoot(FotoalbumPage);
        } else if(routes[0] === 'MembershipPage'){
          this.navCtrl.setRoot(MembershipPage);
        } else if(routes[0] === 'NieuwsbriefRegistrerenPage'){
          this.navCtrl.setRoot(NieuwsbriefRegistrerenPage);
        }else if(routes[0] === 'SmoelenboekPage'){
          this.navCtrl.setRoot(SmoelenboekPage);
        }else if(routes[0] === 'HomePage'){
          this.navCtrl.setRoot(HomePage);
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }
                   
    });
  }
  
  ionViewDidLoad() {
    var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('BestuurPage')) {
      routes.unshift('BestuurPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad BestuurPage', routes);
  }

}
