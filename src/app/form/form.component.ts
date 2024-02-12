// form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  formData: any = {
    name: '',
    district: '',
    city: '',
  };

  submittedData: any;

  submitForm() {
    // Handle form submission logic here
    console.log('Form submitted:', this.formData);

    // Save submitted data for display
    this.submittedData = { ...this.formData };
  }
}
