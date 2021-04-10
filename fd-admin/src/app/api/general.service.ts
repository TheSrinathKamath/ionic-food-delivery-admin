import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private _http: HttpClient) { }

  getContacts(type: string) {
    const params = new HttpParams().append('key', type);
    return this._http.get(`${environment.general}/get_contacts.php`, { params }).toPromise();
  }

  getOffers(key: string = 'all') {
    const params = new HttpParams().append('key', key);
    return this._http.get(`${environment.offers}/get_published_offers.php`, { params }).toPromise();
  }

  getFoodType() {
    return this._http.get(`${environment.general}/get_food_types.php`).toPromise();
  }
}
