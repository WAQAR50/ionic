import { Component } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';*/
import { NavController, NavParams, LoadingController, MenuController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import {EventDetailPage} from '../event-detail/event-detail';
import { BestuurPage } from '../bestuur/bestuur';
import { ContactPage } from '../contact/contact';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
import { HomePage } from '../home/home';
import { MembershipPage } from '../membership/membership';
import { NieuwsbriefRegistrerenPage } from '../nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';

/*
  Generated class for the Agenda page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage { 

  public events:any; 
  public searchEvents:any;
  public error_message:any = '';
  public page:any=1;
  public lastSearchString: any='';

  public eventDetail:any=EventDetailPage;

  constructor( public http: Http,  public platform: Platform,
     public  navParams: NavParams, public loadingCtrl: LoadingController, public navctr: NavController, 
     public menu: MenuController, public localStorage: Storage) {
      //new code
       let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });
      // Show the popup
      loadingPopup.present();

      this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/events').map(res => res.json()).subscribe(data => {
        this.events = data;
        this.page = 2;
        this.localStorage.set('eventsData', {'data': data, 'eventPage': this.page});
        this.searchEvents = this.events;
        loadingPopup.dismiss();
      },
      err => {
          loadingPopup.dismiss();
          this.error_message = 'er is iets fout gegaan!';
      });

//newcodeend



    this.localStorage.get('eventsData').then((eventsData) => {
      this.events = eventsData.data;
      this.page = eventsData.eventPage;
      this.searchEvents = this.events;
    }).catch(() => {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });
      // Show the popup
      loadingPopup.present();

      this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/events').map(res => res.json()).subscribe(data => {
        this.events = data;
        this.page = 2;
        this.localStorage.set('eventsData', {'data': data, 'eventPage': this.page});
        this.searchEvents = this.events;
        loadingPopup.dismiss();
      },
      err => {
          loadingPopup.dismiss();
          this.error_message = 'er is iets fout gegaan!';
      });
    });
    
  }
  
  loadDetailPage(event){
    this.navctr.push(this.eventDetail,{
      eventData: event
    });
  }

  searchData(ev: any){
    let val = ev.target.value;
    if(val != undefined){
      if(val.trim() == ''){
        this.initializeSearchItems();
      }

      if(val && val.trim() != ''){
        this.events = this.events.filter((eventData) => {
          this.lastSearchString = val;
          return ( eventData.post_title.toLowerCase().indexOf( val.toLowerCase() ) > -1 );
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

  initializeSearchItems(){
    this.localStorage.get('eventsData').then((eventsData) => {
      this.events = eventsData.data;
    }).catch(() => {
      this.events = this.searchEvents;
    });
  }

  doRefresh(refresher?){
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();

    this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/events').map(res => res.json()).subscribe(data => {
      this.page = 2;
      this.localStorage.set('eventsData', {'data': data, 'eventPage': this.page});
      this.events = data;
      this.searchEvents = this.events;
      refresher.complete();
      loadingPopup.dismiss();
    },
    err => {
      refresher.complete();
      loadingPopup.dismiss();
      this.error_message = 'er is iets fout gegaan!';
    });
  }

  loadMoreEvents(infiniteScroll){
    setTimeout(()=>{
      if(this.page > 1){
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
          content: 'Data laden...'
        });
        // Show the popup
        loadingPopup.present();

        this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/events?paged='+this.page).map(res => res.json()).subscribe(data => {          
          this.events = this.events.concat(data);
          infiniteScroll.complete();
          loadingPopup.dismiss();
          if(data.length){
            this.page++;
          }else{
            this.page=0;
          }
          this.localStorage.set('eventsData',  {'data': data, 'eventPage': this.page});
          this.searchEvents = this.events;
        },
        err => {
          infiniteScroll.complete();
          loadingPopup.dismiss();
          this.error_message = 'er is iets fout gegaan!';
        });
      }else{
        infiniteScroll.complete();
      }    
    },500);
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
      //this.navctr.setRoot(routes[0]);
      // this.location.go(routes[0]);

        if (routes[0] === 'ContactPage') {
          this.navctr.setRoot(ContactPage);
        }else if(routes[0] === 'BestuurPage'){
          this.navctr.setRoot(BestuurPage );
        } else if(routes[0] === 'FotoalbumPage'){
          this.navctr.setRoot(FotoalbumPage);
        } else if(routes[0] === 'MembershipPage'){
          this.navctr.setRoot(MembershipPage);
        } else if(routes[0] === 'NieuwsbriefRegistrerenPage'){
          this.navctr.setRoot(NieuwsbriefRegistrerenPage);
        }else if(routes[0] === 'SmoelenboekPage'){
          this.navctr.setRoot(SmoelenboekPage);
        }else if(routes[0] === 'HomePage'){
          this.navctr.setRoot(HomePage);
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }
                   
    });
  }
  ionViewDidLoad() {
    var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('AgendaPage')) {
      routes.unshift('AgendaPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad AgendaPage', routes);
  }

}
