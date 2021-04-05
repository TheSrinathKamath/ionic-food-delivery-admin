import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListingService } from '../api/listing.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {


  item_id = null;
  item: any = [];
  img_path = 'assets/images/default.png';

  constructor(
    private _data: ListingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.queryParams['id'];
    if (!id) this.router.navigate(['../'])
    this.loadItemDetails(id)
    this.item_id = id;
  }

  loadItemDetails(id) {
    this._data.getItemDetails(id).subscribe(res => {
      const response_raw = res;
      const response = JSON.parse(JSON.stringify(response_raw))

      if (!response['status']) return;

      this.item = response['result'];
      if (this.item['disp_img'] != 'default.jpg')
        this.img_path = `assets/images/${this.item_id}/${this.item['disp_img']}`
    })
  }

}
