import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isFormsDropdownOpen: boolean = false;
  isFormSubDropdownOpen: boolean = false;
  isServiceDropdownOpen: boolean = false;
  isSubscreensDropdownOpen: boolean = false;
  isSubscreen1DropdownOpen: boolean = false; // For Sublist 1
  isSubscreen2DropdownOpen: boolean = false; // For Sublist 2

  constructor(private router: Router) { }

  toggleFormsDropdown(): void {
    this.isFormsDropdownOpen = !this.isFormsDropdownOpen;
    this.isServiceDropdownOpen = false;
    this.isSubscreensDropdownOpen = false;
    console.log('Forms Dropdown Open:', this.isFormsDropdownOpen);
  }

  toggleFormSubDropdown(): void {
    this.isFormSubDropdownOpen = !this.isFormSubDropdownOpen;
    console.log('Form Sub Dropdown Open:', this.isFormSubDropdownOpen);
  }

  toggleServiceDropdown(): void {
    this.isServiceDropdownOpen = !this.isServiceDropdownOpen;
    this.isFormsDropdownOpen = false;
    this.isSubscreensDropdownOpen = false;
    console.log('Service Dropdown Open:', this.isServiceDropdownOpen);
  }

  toggleSubscreensDropdown(): void {
    this.isSubscreensDropdownOpen = !this.isSubscreensDropdownOpen;
    this.isFormsDropdownOpen = false;
    this.isServiceDropdownOpen = false;
    console.log('Subscreens Dropdown Open:', this.isSubscreensDropdownOpen);
  }

  toggleSubscreen1Dropdown(): void { // Function for Sublist 1
    this.isSubscreen1DropdownOpen = !this.isSubscreen1DropdownOpen;
    this.isSubscreen2DropdownOpen = false; // Close Sublist 2 dropdown when Sublist 1 is opened
  }

  toggleSubscreen2Dropdown(): void { // Function for Sublist 2
    this.isSubscreen2DropdownOpen = !this.isSubscreen2DropdownOpen;
    this.isSubscreen1DropdownOpen = false; // Close Sublist 1 dropdown when Sublist 2 is opened
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
