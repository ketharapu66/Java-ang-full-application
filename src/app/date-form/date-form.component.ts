import { Component } from '@angular/core';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.css']
})
export class DateFormComponent {
  startDate: string = '';
  endDate: string = '';
  employeeId: string = '';
  employeeName: string = '';
  error: string = '';
  errorId: string = '';
  errorName: string = '';

  validateDates() {
    const today = new Date();
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);

    if (startDateObj > today) {
      this.error = "Start date cannot be a future date.";
      return false;
    }

    if (endDateObj > today) {
      this.error = "End date cannot be a future date.";
      return false;
    }

    if (startDateObj > endDateObj) {
      this.error = "Start Date cannot be greater than End Date.";
      return false;
    }

    this.error = '';
    return true;
  }

  validateEmployee() {
    const idPattern = /^[0-9]+$/;
    const namePattern = /^[a-zA-Z ]+$/; // Updated pattern

    if (!idPattern.test(this.employeeId)) {
      this.errorId = "Employee ID should only contain numbers.";
      return false;
    }

    if (!namePattern.test(this.employeeName)) {
      this.errorName = "Employee Name should only contain alphabets.";
      return false;
    }

    return true;
}


  onSubmit() {
    this.error = '';
    this.errorId = '';
    this.errorName = '';

    if (this.validateDates() && this.validateEmployee()) {
      console.log('Form Data:', {
        startDate: this.startDate,
        endDate: this.endDate,
        employeeId: this.employeeId,
        employeeName: this.employeeName
      });
    }
  }
}
