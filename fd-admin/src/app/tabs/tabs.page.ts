import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) { }
  nav(page: string) {
    if (page == 'dish') this.router.navigate(['/add']);
    if (page == 'offer') this.router.navigate(['/offer']);
  }
}
