import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemDetails, Items } from './data.models';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private _http: HttpClient) { }

  getItems(key: string = 'all') {
    const params = new HttpParams().append('key', key);
    return this._http.get(`${environment.products}/get_items.php`, { params }).toPromise();
  }

  getItemDetails(id: string) {
    const params = new HttpParams().append('id', id);
    return this._http.get<ItemDetails>(`${environment.products}/get_item_details.php`, { params });
  }

  setItemStatus(id: string, status: string) {
    const params = new HttpParams().append('id', id).append('status', status);
    return this._http.get<ItemDetails>(`${environment.products}/set_item_status.php`, { params }).toPromise();
  }

  getOffers(key: string = 'all') {
    const params = new HttpParams().append('key', key);
    return this._http.get<any>(`${environment.offers}/get_offers.php`, { params }).toPromise();
  }
  createOffer(dishForm: any) {
    // const params = new HttpParams().append('d_form', dishForm);
    return this._http.post(`${environment.products}/create_items.php`, { dishForm }).toPromise();
  }
  setOfferStatus(id: string, status: string) {
    const params = new HttpParams().append('id', id).append('status', status);
    return this._http.get<any>(`${environment.offers}/set_offer_status.php`, { params }).toPromise();
  }
  deleteOffer(id) {
    const params = new HttpParams().append('id', id);
    return this._http.get<any>(`${environment.offers}/delete_offer.php`, { params }).toPromise();
  }
}
