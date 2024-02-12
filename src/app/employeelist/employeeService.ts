import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8086/employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, employee);
  }

  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete/${id}`);
  }

  getEmployeeIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/ids`);
  }

  getEmployeeDetails(employeeId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/${employeeId}`;
    return this.http.get<any>(apiUrl);
  }

  searchEmployeeById(employeeId: number): Observable<any> {
    const apiUrl = `${this.apiUrl}/search/${employeeId}`;
    return this.http.get<any>(apiUrl);
  }
}
