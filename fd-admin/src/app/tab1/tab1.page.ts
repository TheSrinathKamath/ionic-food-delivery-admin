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
  dataLoaded: boolean = false;

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

    this.dataLoaded = response['status'];
    if (!response['status']) { this.presentToast('Sorry, items not found!'); return };

    this.list = response['result'];
  }
  async outOfStock(id, item_name, event) {
    console.log(id, event.target.checked)
    const status = event.target.checked ? 'active' : 'inactive';
    const response = await this._data.setItemStatus(id, status);
    if (!response['status']) { this.presentToast('Oops, an error occured. Try later!'); return; }

    this.presentToast(`${item_name} has been ${event.target.checked ? 'Activated!' : 'De-activated!'}`);
  }

  getState(is_active) {
    return is_active == '1' ? true : false;
  }
}
