import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ListingService } from '../api/listing.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  Object = Object;
  list: any = {};
  search_key: string = '';

  constructor(
    private _data: ListingService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadItems();
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
      this.loadItems()
      event.target.complete();
      this.presentToast('Refresh complete');
    }, 1000);
  }

  async loadItems(key = 'all') {
    if (key == '') return;
    const response_raw = await this._data.getItems(key)
    const response = JSON.parse(JSON.stringify(response_raw));
    if (!response['status']) { this.presentToast('Sorry, items not found!'); return };

    this.list = response['result'];
  }

}
