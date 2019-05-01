import { Component } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController, Platform } from 'ionic-angular';*/
import { NavController,  LoadingController, MenuController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


import {EventDetailPage} from '../event-detail/event-detail';

import { MembershipPage } from '../membership/membership';
import { AgendaPage } from '../agenda/agenda';
import { ContactPage } from '../contact/contact';
import { NieuwsbriefRegistrerenPage } from '../nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';
import { BestuurPage } from '../bestuur/bestuur';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public event: any = '';
  public post: any = '';
  public event_images: any = '';
  public event_title: any = '';
  public event_start_time: any = '';
  public event_end_time: any = '';
  public post_images: any = '';
  public post_title: any = '';
  public error_message;
  
  public membershipDetail: any= MembershipPage;
  public eventDetail: any = EventDetailPage;



  constructor(public http: Http, public loadingCtrl: LoadingController, public navctr: NavController, public menu: MenuController, public platform: Platform, public localStorage: Storage) {
       this.platform.ready().then(() => {
      this.localStorage.get('homepage_data').then( (homepage_data) => {
       
                  //this.event = homepage_data.event_data[0];
                  this.event = homepage_data;
        if(this.event){
        this.event_images = this.event.event_data[0].featured_img_url.medium_large;
       
        this.event_title = this.event.event_data[0].post_title;
        this.event_start_time = this.event.event_data[0].post_meta._EventStartDate;
        this.event_end_time = this.event.event_data[0].post_meta._EventEndDate;
         }
        this.post = homepage_data.post_data[0];
         if( this.post){
        this.post_images = this.post.featured_img_url.medium_large;
        
        this.post_title = this.post.post_title;
         }
      }).catch(() => {
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
          content: 'Data laden...'
        });
        // Show the popup
        loadingPopup.present();

        this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/homepage_data').map(res => res.json()).subscribe(data => {
          
          this.localStorage.set(`homepage_data`, data);
                
         this.event = data;
          //this.event = data.event_data[0];
           //console.log(this.event);

         
         if ( this.event != null ) {            
          this.event_images = this.event.event_data[0].featured_img_url.medium_large;
          this.event_title = this.event.event_data[0].post_title;
          this.event_start_time = this.event.event_data[0].post_meta._EventStartDate;
          this.event_end_time = this.event.event_data[0].post_meta._EventEndDate;
          }
          this.post = data.post_data[0];
          if ( this.post != null ) {
          this.post_images = this.post.featured_img_url.medium_large;
          this.post_title = this.post.post_title;
          }
          
          
          loadingPopup.dismiss();
      
        },
        err => {
           
            loadingPopup.dismiss();
            this.error_message = 'er is iets fout gegaan!';
        });
      }) ;
      
    });


        //  let loadingPopup = this.loadingCtrl.create({
        //   content: 'Data laden...'
        // });
        // // Show the popup
        // loadingPopup.present();

        // this.http.get('http://businesstijd.demo2.appelit.com/wp-json/presstigers_rest_endpoints/v2/homepage_data').map(res => res.json()).subscribe(data => {
          
        //   this.localStorage.set(`homepage_data`, data);
                
        //  this.event = data;
        //   //this.event = data.event_data[0];
        //    //console.log(this.event);

         
        //  if ( this.event != null ) {            
        //   this.event_images = this.event.event_data[0].featured_img_url.medium_large;
        //   this.event_title = this.event.event_data[0].post_title;
        //   this.event_start_time = this.event.event_data[0].post_meta._EventStartDate;
        //   this.event_end_time = this.event.event_data[0].post_meta._EventEndDate;
        //   }
        //   this.post = data.post_data[0];
        //   if ( this.post != null ) {
        //   this.post_images = this.post.featured_img_url.medium_large;
        //   this.post_title = this.post.post_title;
        //   }

        //   loadingPopup.dismiss();
      
        // },
        // err => {
           
        //     loadingPopup.dismiss();
        //     this.error_message = 'er is iets fout gegaan!';
        // });

   

  }
  
  doRefresh(refresher?){
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();

    this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/homepage_data').map(res => res.json()).subscribe(data => {

      this.localStorage.set(`homepage_data`, data);

       //this.event = data.event_data[0];  
           this.event = data
        
      //console.log(this.event);

       
       if ( this.event != null ) {   
      this.event_images = this.event.event_data[0].featured_img_url.medium_large;
      this.event_title = this.event.event_data[0].post_title;
      this.event_start_time = this.event.event_data[0].post_meta._EventStartDate;
      this.event_end_time = this.event.event_data[0].post_meta._EventEndDate;
       }
      this.post = data.post_data[0];
      if ( this.post != null ) {  
      this.post_images = this.post.featured_img_url.medium_large;
      this.post_title = this.post.post_title;
      }
      
      refresher.complete();
      loadingPopup.dismiss();
       
    },
    err => {
       
      refresher.complete();
      loadingPopup.dismiss();
      this.error_message = 'er is iets fout gegaan!';
    });
  }
   openMembership(){
    this.navctr.setRoot(MembershipPage);
  }

  showEventDetail(){
     this.navctr.push(EventDetailPage,{
       eventData: this.event
    });
    //console.log('afwwwqqw',this.event);
    //console.log('adfsadsa',this.eventDetail);
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

        if (routes[0] === 'AgendaPage') {
          this.navctr.setRoot(AgendaPage);
        }else if(routes[0] === 'ContactPage'){
          this.navctr.setRoot(ContactPage);
        } else if(routes[0] === 'MembershipPage'){
          this.navctr.setRoot(MembershipPage);
        } else if(routes[0] === 'NieuwsbriefRegistrerenPage'){
          this.navctr.setRoot(NieuwsbriefRegistrerenPage);
        }else if(routes[0] === 'SmoelenboekPage'){
          this.navctr.setRoot(SmoelenboekPage);
        }else if(routes[0] === 'FotoalbumPage'){
          this.navctr.setRoot(FotoalbumPage);
        }else if(routes[0] === 'BestuurPage'){
          this.navctr.setRoot(BestuurPage );
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }
                   
    }); 
  }

  ionViewDidLoad() {
      var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('HomePage')) {
      routes.unshift('HomePage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad HomePage', routes);
  }

}
