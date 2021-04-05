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
}
