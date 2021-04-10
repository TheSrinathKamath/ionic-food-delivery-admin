import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { ListingService } from '../api/listing.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  item_id = null;
  item: any = [];
  img_path = 'assets/images/default.png';
  imageSrc: any;
  f_types: any = [];
  w_app_contact_arr: any = [];
  inq_contact_arr: any = [];
  offers: any = [];

  dishForm: FormGroup;

  constructor(
    private _general: GeneralService,
    public toastController: ToastController,
    private _listing: ListingService,
    private fb: FormBuilder
  ) {
    this.dishForm = this.fb.group({
      dishImg: [''],
      isCustomImg: [0],
      dishName: ['', [Validators.required]],
      foodType: ['', [Validators.required]],
      unitPrice: ['', [Validators.required]],
      minOrder: ['', [Validators.required]],
      offer: [''],
      shortDesc: [''],
      desc: ['', [Validators.required]],
      w_app_contact: ['', [Validators.required]],
      inq_contact: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      isActive: [null]
    })
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async ngOnInit() {
    this.fTypes();
    this.getOffer();
    this.w_app_contact_arr = await this.getContact('whatsapp');
    this.inq_contact_arr = await this.getContact('mobile');
  }
  async fTypes() {
    const f_types_raw = await this._general.getFoodType();
    this.f_types = JSON.parse(JSON.stringify(f_types_raw))['result'];
  }
  async getContact(type: string) {
    const contact_raw = await this._general.getContacts(type);
    return JSON.parse(JSON.stringify(contact_raw))['result'];
  }
  async getOffer() {
    const offers_raw = await this._general.getOffers();
    this.offers = JSON.parse(JSON.stringify(offers_raw))['result'];
  }
  onChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.img_path = reader.result as string;

        this.dishForm.patchValue({
          dishImg: reader.result,
          isCustomImg: 1
        });

      };

    }
  }

  async createDish(publish: boolean = false) {
    if (this.dishForm.invalid) { this.presentToast('Enter all required fields!'); return; }
    this.dishForm.controls.isActive.setValue(publish ? 1 : 0);
    if (!this.dishForm.controls.dishImg.value) { this.dishForm.controls.dishImg.setValue('default.png'); }

    const response = await this._listing.createOffer(this.dishForm.value);
  }
}
