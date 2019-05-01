import { Component } from '@angular/core';
/*import { NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';*/
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { LedenDetailPage } from '../leden-detail/leden-detail';

/*
  Generated class for the Leden page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-leden',
  templateUrl: 'leden.html'
})
export class LedenPage {

  public companiesData: any;
  public searchCompanies: any;
  public ledenDetail: any=LedenDetailPage;
  public err_msg: any;
  public page: any=1;
  public lastSearchString: any='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public localStorage: Storage) {

    this.localStorage.get('companiesData').then((companiesData) => {
      this.companiesData = companiesData.data;
      this.page = companiesData.companyPage;
      this.searchCompanies = this.companiesData;
    }).catch(() => {
      let loadingPopup = this.loadingCtrl.create({
        content: 'Data laden...'
      });

      loadingPopup.present();
      
      this.http.get('http://businesstijd.demo2.appelit.com/wp-json/presstigers_rest_endpoints/v2/companies').map(res => res.json()).subscribe(data => {
        this.companiesData = data;
        this.page = 2;
        this.localStorage.set('companiesData', {'data': data, 'companyPage': this.page});
        this.searchCompanies = this.companiesData;
        loadingPopup.dismiss();
      },
      err => {
          loadingPopup.dismiss();
          this.err_msg = 'er is iets fout gegaan!';
      });
    });

  }

  showLedenDetail(companyData){
    this.navCtrl.push(this.ledenDetail, {
      company: companyData
    });
  }

  searchData(ev: any){
    let val = ev.target.value;
    if(val != undefined){
      if(val.trim() == ''){
        this.initializeSearchItems();
      }

      if(val && val.trim() != ''){
        this.companiesData = this.companiesData.filter((companyData) => {
          this.lastSearchString = val;
          return ( companyData.post_title.toLowerCase().indexOf( val.toLowerCase() ) > -1 );
        });
      }
    }    
  }

  clearSearch(ev: any){
    this.initializeSearchItems();
    return false;
  }

  searchKeyupEvent(ev: any){
    let val = ev.target.value;
    if(val.length < this.lastSearchString.length){
      this.initializeSearchItems();
    }
  }

  initializeSearchItems(){
    this.localStorage.get('companiesData').then((companiesData) => {
      this.companiesData = companiesData.data;
    }).catch(() => {
      this.companiesData = this.searchCompanies
    });
  }

  doRefresh(refresher){
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Data laden...'
    });
    // Show the popup
    loadingPopup.present();

    this.http.get('http://businesstijd.demo2.appelit.com/wp-json/presstigers_rest_endpoints/v2/companies').map(res => res.json()).subscribe(data => {
      this.page = 2;
      this.companiesData = data;
      this.localStorage.set('companiesData', {'data': data, 'companyPage': this.page});
      this.searchCompanies = this.companiesData;
      refresher.complete();
      loadingPopup.dismiss();
    },
    err => {
        loadingPopup.dismiss();
        refresher.complete();
        this.err_msg = 'er is iets fout gegaan!';
    });
  }

  loadMoreCompanies(infiniteScroll){
    setTimeout(()=>{
      if(this.page > 1){
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
          content: 'Data laden...'
        });
        // Show the popup
        loadingPopup.present();

        this.http.get('http://businesstijd.demo2.appelit.com/wp-json/presstigers_rest_endpoints/v2/companies?paged='+this.page).map(res => res.json()).subscribe(data => {
          this.companiesData = this.companiesData.concat(data);
          infiniteScroll.complete();
          loadingPopup.dismiss();
          if(data.length){
            this.page++;
          }else{
            this.page=0;
          }
          this.localStorage.set('companiesData', {'data': this.companiesData, 'companyPage': this.page});
          this.searchCompanies = this.companiesData;
        },
        err => {
          infiniteScroll.complete();
          loadingPopup.dismiss();
          this.err_msg = 'er is iets fout gegaan!';
        });
      }else{
        infiniteScroll.complete();
      }    
    },500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LedenPage');
  }

}
