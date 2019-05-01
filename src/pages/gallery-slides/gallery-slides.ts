import { Component } from '@angular/core';
/*import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';*/
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { PhotoViewer } from 'ionic-native';
/*
  Generated class for the GallerySlides page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gallery-slides',
  templateUrl: 'gallery-slides.html'
})

export class GallerySlidesPage {
@ViewChild(Slides) slides: Slides;
  public galleryTitle: any;
  public slideImages: any;
  public galleryDetailslider:  any;
    public PhotoViewer = PhotoViewer;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public viewController: ViewController) {
     let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();
    
    this.galleryTitle = this.navParams.get('title');
    this.slideImages = this.navParams.get('slides');
     this.galleryDetailslider = navParams.get('galleryImagesSlider');
     loadingPopup.dismiss();

  }
  showImage(image, alttext){
    this.PhotoViewer.show(image.image_url);
  }


   dismissModal(){
     this.viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GallerySlidesPage');
  }

}
