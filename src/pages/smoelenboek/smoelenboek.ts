import { Component } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';*/
import {Platform, NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
//import { StatusBar, Splashscreen } from 'ionic-native';
//import { SmoelenboekDetailPage } from '../smoelenboek-detail/smoelenboek-detail';
import { AgendaPage } from '../agenda/agenda';
import { ContactPage } from '../contact/contact';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
import { HomePage } from '../home/home';
import { MembershipPage } from '../membership/membership';
import { BestuurPage } from '../bestuur/bestuur';
/*
  Generated class for the Smoelenboek page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-smoelenboek',
  templateUrl: 'smoelenboek.html'
})
export class SmoelenboekPage {

  public users: any;
  public searchUsers: any;
  public errorMsg: any;
  //public userDetail: any = SmoelenboekDetailPage;

  public lastSearchString: any='';

  public usersOffset: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public localStorage: Storage,public platform: Platform, public app: App) {

    this.localStorage.get('usersData').then((usersData) => {
      this.users = usersData.data;
     // console.log( 'waqar', this.users.data.user_company);
       this.usersOffset = 5;
      this.usersOffset = usersData.usersOffset;
      this.searchUsers = this.users;
    }).catch(() => {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });
      // Show the popup
      loadingPopup.present();

      this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/all_company_users').map(res => res.json()).subscribe(data => {
        this.users = data;
        //console.log('dsfsdf', this.users);
        this.usersOffset = 5;
        this.localStorage.set(`usersData`, {'data': data, 'usersOffset': this.usersOffset});
        //this.localStorage.set(`usersData`, {'data': data});
        this.searchUsers = this.users;
        loadingPopup.dismiss();
      },
      err => {
          loadingPopup.dismiss();
          this.errorMsg = 'er is iets fout gegaan!';
      });
    });

      /*platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      //Registration of push in Android and Windows Phone
      platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack()){ //Can we go back?
          nav.pop();
        }else{
          this.platform.exitApp(); //Exit from app
        }
      });
    });
*/

  }

  doRefresh(refresher){
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();

    this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/all_company_users').map(res => res.json()).subscribe(data => {
      this.users = data;
   //console.log('giugigiu', this.users);
      this.usersOffset = 5;
      this.localStorage.set(`usersData`, {'data': data, 'usersOffset': this.usersOffset});
      //this.localStorage.set(`usersData`, {'data': data});
      this.searchUsers = this.users;
      refresher.complete();
      loadingPopup.dismiss();
    },
    err => {
        refresher.complete();
        loadingPopup.dismiss();
        this.errorMsg = 'er is iets fout gegaan!';
    });
  }

  loadMoreUsers(infiniteScroll){
    setTimeout(()=>{
      if(this.usersOffset > 4){
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
          content: 'Data laden...'
        });
        // Show the popup
        loadingPopup.present();

        this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/all_company_users?offset='+this.usersOffset).map(res => res.json()).subscribe(data => {
          this.users = this.users.concat(data);
          //console.log('kkbkk', this.users);
          infiniteScroll.complete();
          loadingPopup.dismiss();
          if(data.length){
            this.usersOffset = this.usersOffset + 5;
          }else{
            this.usersOffset = 0;
          }
          this.localStorage.set(`usersData`, {'data': this.users, 'usersOffset': this.usersOffset});
          //this.localStorage.set(`usersData`, {'data': this.users});
          this.searchUsers = this.users;
        },
        err => {
          infiniteScroll.complete();
          loadingPopup.dismiss();
          this.errorMsg = 'er is iets fout gegaan!';
        });
      }else{
        infiniteScroll.complete();
      }    
    },500);
  }

  /*viewDetail(user){
    this.navCtrl.push(this.userDetail, {
      user: user
    });
    return false;
  }
  */
  searchData(ev: any){
    let val = ev.target.value;
    if(val != undefined){
      if(val.trim() == ''){
        this.initializeSearchItems();
      }

      if(val && val.trim() != ''){
        this.users = this.users.filter((userData) => {
          this.lastSearchString = val;
          return ( userData.data.display_name.toLowerCase().indexOf( val.toLowerCase() ) > -1 );
        });
      }
    }    
  }
  clearSearch(ev: any){
    this.initializeSearchItems();
    return false;
  }

  searchKeyupEvent(ev: any){
    let val = ev.target.value;
    if(val.length < this.lastSearchString.length){
      this.initializeSearchItems();
    }
  }
 mailTo(mail:string){
    window.open('mailto:'+mail);
    return false;
  }
  initializeSearchItems(){
    this.localStorage.get('usersData').then((usersData) => {
      this.users = usersData.data;
    }).catch(() => {
      this.users = this.searchUsers;
    });
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
      // this.navCtrl.setRoot(routes[0]);
      // this.location.go(routes[0]);

        if (routes[0] === 'AgendaPage') {
          this.navCtrl.setRoot(AgendaPage);
        }else if(routes[0] === 'ContactPage'){
          this.navCtrl.setRoot(ContactPage);
        } else if(routes[0] === 'FotoalbumPage'){
          this.navCtrl.setRoot(FotoalbumPage);
        } else if(routes[0] === 'MembershipPage'){
          this.navCtrl.setRoot(MembershipPage);
        } else if(routes[0] === 'HomePage'){
          this.navCtrl.setRoot(HomePage);
        }else if(routes[0] === 'BestuurPage'){
          this.navCtrl.setRoot(BestuurPage );
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }
                   
    }); 
  }
  ionViewDidLoad() {
    var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('SmoelenboekPage')) {
      routes.unshift('SmoelenboekPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad SmoelenboekPage', routes);
  }

}
