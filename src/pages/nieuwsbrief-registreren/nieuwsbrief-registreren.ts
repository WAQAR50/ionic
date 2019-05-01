import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, Platform } from 'ionic-angular';
/*import { Jsonp, Http, Headers, URLSearchParams } from '@angular/http';
import { FormGroup, FormBuilder, FormControl, Validators, } from '@angular/forms';*/

import {  Http, Headers, URLSearchParams } from '@angular/http';
import {  FormBuilder,  Validators, } from '@angular/forms';
import { AgendaPage } from '../agenda/agenda';
import { ContactPage } from '../contact/contact';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
import { HomePage } from '../home/home';
import { MembershipPage } from '../membership/membership';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';
import { BestuurPage } from '../bestuur/bestuur';
/*
  Generated class for the NieuwsbriefRegistreren page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nieuwsbrief-registreren',
  templateUrl: 'nieuwsbrief-registreren.html'
})
export class NieuwsbriefRegistrerenPage {
  
  public mailchimpRes: any;
  public mailchimpResErr: any;


  public newsletterForm = this.newsletterFormBuilder.group({
    'newletterEmail': ['', Validators.compose([Validators.maxLength(70), 
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
  });
  
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public newsletterFormBuilder: FormBuilder, public http: Http, public loadingCtrl: LoadingController) {}

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
        }else if(routes[0] === 'SmoelenboekPage'){
          this.navCtrl.setRoot(SmoelenboekPage);
        }else if(routes[0] === 'HomePage'){
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
    if (!routes.includes('NieuwsbriefRegistrerenPage')) {
      routes.unshift('NieuwsbriefRegistrerenPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad NieuwsbriefRegistrerenPage', routes);
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  addSubscription(value: Object){
    const body = new URLSearchParams();
    Object.keys(value).forEach(key => {
      body.set(key,value[key]);
    });
    
    let mailchimpHeaders = new Headers();
    mailchimpHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    

    let loadingPopup = this.loadingCtrl.create({
      content: "Even geduld aub..."
    });

    loadingPopup.present();

    console.log(body);

    this.http.post(
      'https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/newsletter_subscription', 
      body.toString(), 
      {headers: mailchimpHeaders}
    ).map( res => res.json() ).subscribe( data => {
      loadingPopup.dismiss();
      //console.log('dataaa',data);
      alert(data.data);
    }, err => {
      //console.log('error', err);
      loadingPopup.dismiss();
      alert('Kan niet abonneren. Probeer het opnieuw.');
    });


  }

}
