import { Component, ViewChild } from '@angular/core';

/*import { Platform, MenuController, NavController, Nav, NavParams, ModalController, Modal } from 'ionic-angular';*/
import { Platform, MenuController, Nav, ModalController, App, AlertController} from 'ionic-angular';




// import { StatusBar, Splashscreen, OneSignal } from 'ionic-native';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AgendaPage } from '../pages/agenda/agenda';
import { ContactPage } from '../pages/contact/contact';
import { FotoalbumPage } from '../pages/fotoalbum/fotoalbum';
import { HomePage } from '../pages/home/home';
//import { LedenPage } from '../pages/leden/leden';
import { MembershipPage } from '../pages/membership/membership';

import { NieuwsbriefRegistrerenPage } from '../pages/nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../pages/smoelenboek/smoelenboek';
import { Location } from '@angular/common';
import { BestuurPage } from '../pages/bestuur/bestuur';

/*import { NieuwsDetailPage } from '../pages/nieuws-detail/nieuws-detail';
import { GalleryDetailPage } from '../pages/gallery-detail/gallery-detail';
import { LedenDetailPage } from '../pages/leden-detail/leden-detail';
import { GallerySlidesPage } from '../pages/gallery-slides/gallery-slides';
import { SmoelenboekDetailPage } from '../pages/smoelenboek-detail/smoelenboek-detail';
import { TermAndConditionsPage} from '../pages/term-and-condition/term-and-condition';*/


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  myDate: Date;
  public facebook: string = 'https://www.facebook.com/businessclubbijdetijd/';
  public linkedin: string = 'https://www.linkedin.com/company/businessclub-bij-de-tijd/';
  //public youtube: string='https://youtube.com/';
  public phone: string = '+1244775125';
  public mail: string = 'info@businesstijd.nl';


  // make TabsPage the root page
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  // bestuurpage = {title: 'Bestuur', component: BestuurPage};
  subscriptionpage = { title: 'Nieuwsbrief Registreren', component: NieuwsbriefRegistrerenPage };
  // contactpage = {title: 'Contact', component: ContactPage};

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public modal: ModalController,
    public app: App,
    public alertCtrl: AlertController,
    public location: Location,
 
    //public navCtrl:NavController
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Agenda', component: AgendaPage },
      { title: 'Bestuur', component: BestuurPage },
      { title: 'Fotoalbum', component: FotoalbumPage },
      { title: 'Leden', component: SmoelenboekPage },
      { title: 'Lid Worden', component: MembershipPage },
      { title: 'Contact', component: ContactPage },
    ];
   console.log('waqar',this.myDate = new Date()  );
  }
 
  presentNewsletterModal() {
    let newsletterModal = this.modal.create(NieuwsbriefRegistrerenPage);
    newsletterModal.present();
  }

  openMembership() {
    this.nav.setRoot(MembershipPage);
  }

  openSocial(link) {
    window.open(link, '_system', 'location=yes');
    return false;
  }

  callNum(num: string) {
    window.open('tel:' + num);
  }

  sendMail(mail: string) {
    window.open('mailto:info@businesstijd.nl');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let nav = this.app.getActiveNav();
      let activeView = nav.getActive().name;
      localStorage.setItem("routes", JSON.stringify([activeView]));
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      //this.dateformat.locale('fr')

      // OneSignal.startInit('68b2e6cb-3ccc-4bd7-920c-134da5876015', '524100024541');

      // OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

      // OneSignal.handleNotificationReceived().subscribe((jsonData:any) => {
      //     let dataFromPush = JSON.stringify(jsonData)
      //     alert(dataFromPush);
      // });

      // OneSignal.handleNotificationOpened().subscribe(() => {

      // });

      // OneSignal.endInit();
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

      /*  if (routes[0] === 'AgendaPage') {
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
        }else if(routes[0] === 'BestuurPage'){
          this.navCtrl.setRoot(BestuurPage );
        }else {
            this.platform.exitApp(); //Exit from app
             console.log('here i am');
        }*/
                   
    }); 
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
    ionViewDidLoad() {
    var routes = JSON.parse(localStorage.getItem('routes'));
    if (!routes.includes('HomePage')) {
      routes.unshift('HomePage');
      localStorage.setItem("routes", JSON.stringify(routes));
    }
    console.log('ionViewDidLoad HomePage');
  }
}
