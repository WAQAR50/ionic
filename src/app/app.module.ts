import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';



import { AgendaPage } from '../pages/agenda/agenda';
import { ContactPage } from '../pages/contact/contact';
import { FotoalbumPage } from '../pages/fotoalbum/fotoalbum';
import { HomePage } from '../pages/home/home';
import { LedenPage } from '../pages/leden/leden';
import { MembershipPage } from '../pages/membership/membership';
import { NieuwsbriefRegistrerenPage } from '../pages/nieuwsbrief-registreren/nieuwsbrief-registreren';
import { SmoelenboekPage } from '../pages/smoelenboek/smoelenboek';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { GalleryDetailPage } from '../pages/gallery-detail/gallery-detail';
import { GallerySlidesPage } from '../pages/gallery-slides/gallery-slides';
import { LedenDetailPage } from '../pages/leden-detail/leden-detail';
import { SmoelenboekDetailPage } from '../pages/smoelenboek-detail/smoelenboek-detail';
import { BestuurPage } from '../pages/bestuur/bestuur';
import { MomentModule } from 'angular2-moment';
// import { Deeplinks } from '@ionic-native/deeplinks';


@NgModule({
  declarations: [
    MyApp,
    AgendaPage,
    ContactPage,
    FotoalbumPage,
    HomePage,
    LedenPage,
    MembershipPage,
    NieuwsbriefRegistrerenPage,
    SmoelenboekPage,
    EventDetailPage,
    GalleryDetailPage,
    GallerySlidesPage,
    LedenDetailPage,
    SmoelenboekDetailPage,
    BestuurPage,
    

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    JsonpModule,
    FormsModule,
    MomentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgendaPage,
    ContactPage,
    FotoalbumPage,
    HomePage,
    LedenPage,
    MembershipPage,
    NieuwsbriefRegistrerenPage,
    SmoelenboekPage,
    EventDetailPage,
    GallerySlidesPage,
    GalleryDetailPage,
    LedenDetailPage,
    SmoelenboekDetailPage,
    BestuurPage,

  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Storage
  ]
})
export class AppModule { }
