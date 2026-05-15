import { Component } from '@angular/core';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent {
  selectedPartner = '';

  selectedPopup: string | null = null;

  openPopup(type: string) {
    this.selectedPopup = type;
  }

  closePopup() {
    this.selectedPopup = null;
  }
}
