import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PhotoViewer } from 'ionic-native';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { GallerySlidesPage } from '../gallery-slides/gallery-slides';

/*
  Generated class for the GalleryDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-gallery-detail',
  templateUrl: 'gallery-detail.html'
})
export class GalleryDetailPage {
  @ViewChild(Slides) slides: Slides;
  public galleryDetail: any;
  public gallerySlide: any;
  public gallerySlider: any =  GallerySlidesPage;
  public PhotoViewer = PhotoViewer;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modal: ModalController) {
    this.galleryDetail = navParams.get('galleryImages');
    //console.log(this.galleryDetail);
  }

  showImage(image, alttext){
    this.PhotoViewer.show(image.image_url);
     //console.log('ionViewDidLoad', this.galleryDetail.images);
     //console.log('array', this.galleryDetail);
  }

  viewGallery(image){
    this.navCtrl.push(this.gallerySlider, {
      galleryImagesSlider: this.galleryDetail
    });
    //console.log('arraylist',this.galleryDetail);
  }


  // showImages(slideImages, galleryTitle){
  //   let gallerySlideModal = this.modal.create(GallerySlidesPage, {slides: slideImages, title: galleryTitle});
  //   gallerySlideModal.present();
  //    //console.log('ionViewDidLoad', slideImages);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryDetailPage');
  }

}
