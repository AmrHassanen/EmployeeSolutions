// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getEmployees(pageNumber: number, pageSize: number): Observable<{ employees: Employee[]; totalEmployees: number }> {
    return this.http.get<{ employees: Employee[]; totalEmployees: number }>(`${this.apiUrl}employees?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}employees/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl+'employees', employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}employees/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}employees/${id}`);
  }
}
