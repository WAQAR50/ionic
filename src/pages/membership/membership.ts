import { Component  } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Jsonp, Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
*/
import { NavController, NavParams, LoadingController,  ModalController, Platform } from 'ionic-angular';
import {  FormBuilder,  Validators } from '@angular/forms';
import { Jsonp, Http, URLSearchParams,  Headers } from '@angular/http';


import { AgendaPage } from '../agenda/agenda';
import { ContactPage } from '../contact/contact';
import { FotoalbumPage } from '../fotoalbum/fotoalbum';
import { HomePage } from '../home/home';
import { NieuwsbriefRegistrerenPage } from '../nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../smoelenboek/smoelenboek';
import { BestuurPage } from '../bestuur/bestuur';

/*
  Generated class for the Membership page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-membership',
  templateUrl: 'membership.html'
})
export class MembershipPage {
  
  
  public companiesData: any;
  //public membershipFormData: any;
  public membershipForm: any;

  public disableSendButton : boolean = true;
  public cucumber: boolean;
  

  public errorMsg: any;
  public successMsg: any;

  public http: any;
  public jsonp: Jsonp;

  public businesstijd_register: Number;

  public bestaand_bedrijf: Boolean;
  public nieuw_bedrijf: Boolean;

  public messages: any;
  public errors: any;


  constructor( public nav: NavController, public platform: Platform, navParams: NavParams,
     public membershipFormBuilder: FormBuilder, http: Http, jsonp: Jsonp, public loadginCtrl: LoadingController, public viewModel: ModalController) {
    
    let loadingPopup = loadginCtrl.create({
      content: "Data laden..."
    });

    loadingPopup.present();    

    this.nieuw_bedrijf = true;
    this.bestaand_bedrijf = false;

    http.get('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/registered_companies').map(res => res.json()).subscribe(data => {
      this.companiesData = data;
      loadingPopup.dismiss();
      //console.log('data', data);
    },
    err => {
      this.errorMsg = "Kan geen bedrijven gegevens op te halen";
      loadingPopup.dismiss();
     
    });

    this.http = http;

     this.membershipForm = this.membershipFormBuilder.group({
      'company_name': ['', Validators.required],
      'Adres_5572':  ['', Validators.required],
      'Postcode_5572':  ['', Validators.required],
      'Plaats_5572': '',
      'phone_number_5572': '',
      'company_email': ['', Validators.compose([Validators.maxLength(70), 
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'Website_5572': '',
      'btiusername': ['', Validators.required],
      'user_phone_number_5572': '',
      'user_email': ['', Validators.compose([Validators.maxLength(70), 
      Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      'machtiging': '',
      'Rekeningnummer_5572': '',
      'terms_and_conditions': ['accepteren', Validators.required],
   });
  }
  submitMembership(membershipForm){
    //console.log(this.membershipForm.value);
    let loadingPopup = this.loadginCtrl.create({
      content: "Het indienen van Contact Aanvraag..."
    });
     loadingPopup.present();
    const body = new URLSearchParams();
    //console.log(this.membershipForm.value);
    Object.keys(this.membershipForm.value).forEach(key => {
      //console.log(this.membershipForm.value[key]);
      body.set(key,this.membershipForm.value[key]);
    });
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('https://businesstijd.nl/wp-json/presstigers_rest_endpoints/v2/register_members', body.toString(), {
      headers: headers,
    }).map(res=> res.json()).subscribe(data=> {
      if(data.status == 'success'){
        this.errorMsg = false;
        this.messages = data.message;
        loadingPopup.dismiss();
        alert(this.messages);
      }else if(data.status == 'error'){
        this.successMsg = false;
        this.errors = data.errors;
        loadingPopup.dismiss();
      }
    },
    err=>{
      this.errorMsg = "Kan lidmaatschap niet posten";
    });

  }


  showBedrijf(){

    if(this.businesstijd_register == 1){
      this.nieuw_bedrijf = true;
      this.bestaand_bedrijf = false;
    }

    if(this.businesstijd_register == 2){
      this.bestaand_bedrijf = true;
      this.nieuw_bedrijf = false;
    }
    //console.log(this.businesstijd_register);
  }


  updateCucumber(e) {
    //console.log('Cucumbers new state:' + this.cucumber);
    if( this.cucumber ) {
      this.disableSendButton = false;
    } else {
      this.disableSendButton = true;
    }
    
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
          this.nav.setRoot(AgendaPage);
        }else if(routes[0] === 'ContactPage'){
          this.nav.setRoot(ContactPage);
        } else if(routes[0] === 'FotoalbumPage'){
          this.nav.setRoot(FotoalbumPage);
        } else if(routes[0] === 'NieuwsbriefRegistrerenPage'){
          this.nav.setRoot(NieuwsbriefRegistrerenPage);
        }else if(routes[0] === 'SmoelenboekPage'){
          this.nav.setRoot(SmoelenboekPage);
        }else if(routes[0] === 'HomePage'){
          this.nav.setRoot(HomePage);
        }else if(routes[0] === 'BestuurPage'){
          this.nav.setRoot(BestuurPage );
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }
                   
    }); 
  }

 
  ionViewDidLoad() {
      var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('MembershipPage')) {
      routes.unshift('MembershipPage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad MembershipPage', routes);
  }

}
