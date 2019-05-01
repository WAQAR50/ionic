import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EventDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {
  public eventDetail:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.eventDetail = navParams.get('eventData');
     //console.log('on events detail page', this.eventDetail.venue.post_meta._VenueURL[0]);
    //this.eventDetail = this.eventDetail.event_data[0];
  
    //console.log('on events detail page', this.eventDetail.ID);

    if( this.eventDetail.ID != null){
      this.eventDetail = navParams.get('eventData');
    }else{
         this.eventDetail = this.eventDetail.event_data[0];
        
    }

  }

  loadLink(link){
    
    window.open(this.eventDetail.venue.post_meta._VenueURL[0], '_system', 'location=yes');
    console.log('on events detail page', this.eventDetail.venue.post_meta._VenueURL[0]);
    return false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

}
