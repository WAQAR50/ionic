import { Component } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';*/
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { GalleryDetailPage } from '../gallery-detail/gallery-detail'


import { AgendaPage } from '../agenda/agenda';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MembershipPage } from '../membership/membership';
import { NieuwsbriefRegistrerenPage } from '../nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';
import { BestuurPage } from '../bestuur/bestuur';




/*
  Generated class for the Fotoalbum page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fotoalbum',
  templateUrl: 'fotoalbum.html'
})
export class FotoalbumPage {

  public fotoGallery: any;
  public errorMsg: any;
  public galleryDetail: any = GalleryDetailPage;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public localStorage: Storage) {
   
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });
      // Show the popup
      loadingPopup.present();

      this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/gallery_images').map(res => res.json()).subscribe(data => {
        this.fotoGallery = data;
        this.localStorage.set(`galleryData`, data);
        loadingPopup.dismiss();
      },
      err => {
          loadingPopup.dismiss();
          this.errorMsg = 'er is iets fout gegaan!';
      });
   
   
   
    this.localStorage.get('galleryData').then((galleryData) => {
      this.fotoGallery = galleryData;
    }).catch(() => {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });
      // Show the popup
      loadingPopup.present();

      this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/gallery_images').map(res => res.json()).subscribe(data => {
        this.fotoGallery = data;
        this.localStorage.set(`galleryData`, data);
        loadingPopup.dismiss();
      },
      err => {
          loadingPopup.dismiss();
          this.errorMsg = 'er is iets fout gegaan!';
      });
    });
    
  }

  doRefresh(refresher?){
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();

    this.http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/gallery_images').map(res => res.json()).subscribe(data => {
      this.fotoGallery = data;
      this.localStorage.set(`galleryData`, data);
      refresher.complete();
      loadingPopup.dismiss();
    },
    err => {
      refresher.complete();
      loadingPopup.dismiss();
      this.errorMsg = 'er is iets fout gegaan!';
    });
  }

  viewGallery(gallery){
    this.navCtrl.push(this.galleryDetail, {
      galleryImages: gallery
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
       //this.navCtrl.setRoot(routes[0]);
      // this.location.go(routes[0]);

        if (routes[0] === 'AgendaPage') {
          this.navCtrl.setRoot(AgendaPage);
        }else if(routes[0] === 'ContactPage'){
          this.navCtrl.setRoot(ContactPage);
        } else if(routes[0] === 'MembershipPage'){
          this.navCtrl.setRoot(MembershipPage);
        } else if(routes[0] === 'NieuwsbriefRegistrerenPage'){
          this.navCtrl.setRoot(NieuwsbriefRegistrerenPage);
        }else if(routes[0] === 'SmoelenboekPage'){
          this.navCtrl.setRoot(SmoelenboekPage);
        }else if(routes[0] === 'HomePage'){
          this.navCtrl.setRoot(HomePage);
        }else if(routes[0] === 'BestuurPage'){
          this.navCtrl.setRoot(BestuurPage);
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }
                   
    }); 
  }


  ionViewDidLoad() {
     var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('FotoalbumPage')) {
      routes.unshift('FotoalbumPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad FotoalbumPage', routes);
  }

}
