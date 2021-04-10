import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DateTimeService } from '../helpers/date-time.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  offerForm: FormGroup;
  today;

  constructor(
    public _date: DateTimeService,
    public toastController: ToastController,
    public alertController: AlertController,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.offerForm = this.fb.group({
      offerName: ['', [Validators.required]],
      isPercent: [false, [Validators.required]],
      discount: ['', [Validators.required]],
      startDate: [new Date().toISOString(), [Validators.required]],
      endDate: [new Date().toISOString(), [Validators.required]],
    })
    this.today = new Date().toISOString()
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'The offer will be made active if you publish.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.presentToast('Saved to drafts');
          this._router.navigate(['/']);
        }
      }, {
        text: 'Ok',
        handler: () => {
          this.presentToast('Offer published successfully!');
          this._router.navigate(['/tabs/offers']);
        }
      }]
    });

    await alert.present();
  }
  ngOnInit() {
  }
  formatDate(date) {
    console.log(this._date.formatDate(date))
    return this._date.formatDate(date);
  }
  publish() {
    if (this.offerForm.invalid) { this.presentToast('Please enter all fields!'); return; }
    this.presentAlert()
    console.log(this.offerForm.value)
  }
}
