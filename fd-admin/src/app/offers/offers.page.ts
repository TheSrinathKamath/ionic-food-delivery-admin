import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ListingService } from '../api/listing.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  Object = Object;
  list: any = {};
  dataLoaded: boolean = false;

  constructor(
    public toastController: ToastController,
    private _router: Router,
    private _data: ListingService
  ) { }

  ngOnInit() {
    this.loadOffers();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.loadOffers();
      event.target.complete();
      this.presentToast('Refresh complete');
    }, 1000);
  }

  async loadOffers(key = 'all') {
    if (key == '') return;

    const response_raw = await this._data.getOffers(key)
    const response = JSON.parse(JSON.stringify(response_raw));

    this.dataLoaded = response['status'];
    if (!response['status']) { this.presentToast('Sorry, items not found!'); return };

    this.list = response['result'];
  }

  getState(is_active) {
    return is_active == '1' ? true : false;
  }

  async deactivateOffer(id, event) {
    const status = event.target.checked ? 'active' : 'inactive';
    const response = await this._data.setOfferStatus(id, status);
    if (!response['status']) { this.presentToast('Oops, an error occured. Try later!'); return; }
    this.loadOffers();
    this.presentToast(`Offer has been ${event.target.checked ? 'Activated!' : 'De-activated!'}`);
  }
  async deleteOffer(id, offer_name, event) {
    if (!confirm('The offer will be deleted! Press OK to confirm.')) return;

    const status = event.target.checked ? 'active' : 'inactive';
    const response = await this._data.deleteOffer(id);
    if (!response['status']) { this.presentToast('Oops, an error occured. Try later!'); return; }

    this.presentToast(`Offer has been deleted!`);
    this.loadOffers();
  }
}
