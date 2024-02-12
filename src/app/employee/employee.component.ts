import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  selectedEmployee: any;
  searchEmployeeId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if the route has an 'id' parameter
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // If 'id' parameter exists, fetch employee by ID
      this.fetchEmployeeById(id);
    } else {
      // If 'id' parameter is not present, fetch all employees
      this.fetchEmployees();
    }
  }

  fetchEmployees() {
    this.http.get<any[]>('http://localhost:8086/employee').subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employee data', error);
      }
    );
  }

  fetchEmployeeById(id: string) {
    this.http.get(`http://localhost:8086/employee/search/${id}`).subscribe(
      (data) => {
        this.selectedEmployee = { ...data };
      },
      (error) => {
        console.error('Error fetching employee details', error);
      }
    );
  }

  editEmployee(employee: any) {
    // Set the selectedEmployee to the chosen employee for editing
    this.selectedEmployee = { ...employee };
  }

  updateEmployee() {
    if (this.selectedEmployee) {
      // Make an HTTP request to update the employee details on the server
      this.http.put(`http://localhost:8086/employee/${this.selectedEmployee.id}`, this.selectedEmployee).subscribe(
        (response) => {
          console.log('Update successful:', response);
          // Update the employees list with the updated employee details
          this.fetchEmployees();
        },
        (error) => {
          console.error('Update error:', error);
        }
      );
    }
  }

  searchEmployee() {
    if (this.searchEmployeeId) {
      // Make an HTTP request to search for an employee by ID
      this.http.get(`http://localhost:8086/employee/search/${this.searchEmployeeId}`).subscribe(
        (data) => {
          this.selectedEmployee = { ...data };
        },
        (error) => {
          console.error('Error searching for employee by ID', error);
        }
      );
    }
  }
}
