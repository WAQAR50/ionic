import { Component, ViewChild } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Jsonp, Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http'; 
*/
import {Platform, NavController, NavParams, LoadingController, App, Nav } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Jsonp, Http, URLSearchParams, Headers } from '@angular/http';

import { AgendaPage } from '../agenda/agenda';
import { BestuurPage } from '../bestuur/bestuur';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
import { HomePage } from '../home/home';
import { MembershipPage } from '../membership/membership';
import { NieuwsbriefRegistrerenPage } from '../nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';


/*
  Generated class for the Contact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild(Nav) nav: Nav;

  public contactForm = this.contactFormBuilder.group({
    'name': ['', Validators.compose([Validators.required])],
    'contactperson': [''],
    'email': ['', Validators.compose([Validators.maxLength(70),
    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
    'phone': [''],
    'subject': ['', Validators.compose([Validators.required])],
    'message': ['', Validators.compose([Validators.required])]
  });

  constructor(public platform: Platform, public app: App, public navCtrl: NavController, public navParams: NavParams, public contactFormBuilder: FormBuilder, public http: Http, public jsonp: Jsonp, public loadingCtrl: LoadingController) {

  }

  submitRequest(value: Object) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Het indienen van aanvragen, even geduld aub'
    });

    loadingPopup.present();

    const body = new URLSearchParams();

    Object.keys(value).forEach(key => {
      body.set(key, value[key]);
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //alert(body);

    this.http.post('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/contact_us', body.toString(), {
      headers: headers
    }).map(res => res.json()).subscribe(data => {
      loadingPopup.dismiss();
      alert(data.message);
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
        }else if(routes[0] === 'BestuurPage'){
          this.navCtrl.setRoot(BestuurPage );
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
    if (!routes.includes('ContactPage')) {
      routes.unshift('ContactPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad Contact Page', routes);
  }

}
