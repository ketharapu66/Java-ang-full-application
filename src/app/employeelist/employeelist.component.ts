import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employeeService';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {
  employees: any[] = [];
  selectedEmployeeId: number | null = null;

  newEmployee = {
    id: null,
    name: '',
    salary: 0,
    age: 0
  };
  updateEmployee = {
    id: null,
    name: '',
    salary: 0,
    age: 0
  };
  deleteId: number | null = null;
  selectedEmployee: any = null;
  searchedEmployeeId: number | null = null;
  employeeIds: number[] = [];
  searchEmployeesByName: string = '';

  searchName: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchEmployees();
    this.fetchEmployeeIds();

    this.employeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data;
    });
  }

  fetchEmployees() {
    this.employeeService.getEmployees()
      .subscribe(
        data => {
          console.log('Fetched Employees:', data);
          this.employees = data;
        },
        error => {
          console.error('Error fetching employees:', error);
        }
      );
  }

  fetchEmployeeIds() {
    this.employeeService.getEmployeeIds()
      .subscribe(
        ids => {
          this.employeeIds = ids;
        },
        error => {
          console.error('Error fetching employee IDs:', error);
        }
      );
  }

  onSubmit() {
    // Validate newEmployee fields
    if (!this.newEmployee.id || !this.newEmployee.name || !this.newEmployee.salary || !this.newEmployee.age) {
      alert('Please enter all fields for the new employee.');
      return;
    }

    this.employeeService.addEmployee(this.newEmployee)
      .subscribe(
        response => {
          console.log(response);
          this.fetchEmployees();
          this.resetForm();
          alert('Employee added successfully!');
        },
        error => {
          console.error(error);
        }
      );
  }

  onDelete() {
    if (!this.deleteId) {
      alert('Please select an Employee ID before deleting.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');

    if (isConfirmed) {
      console.log(`Deleting employee with ID: ${this.deleteId}`);
      this.employeeService.deleteEmployee(this.deleteId).subscribe(
        response => {
          console.log('Delete successful:', response);
          this.employees = this.employees.filter(emp => emp.id !== this.deleteId);
          this.deleteId = null;
        },
        error => {
          console.error('Delete error:', error);
        }
      );
    } else {
      console.log('Deletion cancelled.');
    }
  }

  onEmployeeIdSelected() {
    const selectedId = this.updateEmployee.id;

    if (selectedId !== null) {
      this.employeeService.getEmployeeDetails(selectedId)
        .subscribe(
          (employeeDetails: any) => {
            this.updateEmployee.name = employeeDetails.name;
            this.updateEmployee.salary = employeeDetails.salary;
            this.updateEmployee.age = employeeDetails.age;
          },
          error => {
            console.error('Error fetching employee details:', error);
          }
        );
    }
  }

  onUpdate() {
    // Validate updateEmployee fields
    if (!this.updateEmployee.id || !this.updateEmployee.name || !this.updateEmployee.salary || !this.updateEmployee.age) {
      alert('Please enter all fields for updating the employee.');
      return;
    }

    this.employeeService.updateEmployee(this.updateEmployee)
      .subscribe(
        response => {
          console.log('Response:', response);

          if (response && response.hasOwnProperty('success') && response.success === true) {
            alert('Employee updated successfully');
            this.fetchEmployees();
          } else {
            alert('Employee update successful');
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  onSearchById() {
    // Reset selectedEmployee in case of previous search results
    this.selectedEmployee = null;

    // Check if searchedEmployeeId is not null or undefined
    if (this.searchedEmployeeId != null) {
      // Check if the selectedEmployeeId is a valid number
      if (isNaN(this.searchedEmployeeId)) {
        console.error('Invalid Employee ID. Please select a valid ID.');
        alert('Invalid Employee ID. Please select a valid ID.');
        return;
      }

      this.employeeService.searchEmployeeById(this.searchedEmployeeId).subscribe(
        (data) => {
          // Check if the response contains data and is not empty
          if (data && Object.keys(data).length > 0) {
            this.selectedEmployee = { ...data };
            alert('Employee found successfully!');
          } else {
            console.error('No employee found with the provided ID.');
            alert('No employee found with the provided ID.');
          }
        },
        (error) => {
          console.error('Error searching for employee by ID', error);
          alert('Error searching for employee by ID. Please try again later.');
        }
      );
    } else {
      console.error('Please select an Employee ID before searching.');
      alert('Please select an Employee ID before searching.');
    }
  }

  resetForm() {
    this.newEmployee = {
      id: null,
      name: '',
      salary: 0,
      age: 0
    };
  }
}
