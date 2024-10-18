import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  pageNumber = 1;
  pageSize = 10;
  totalEmployees = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.employees = response.employees;
        this.totalEmployees = response.totalEmployees;
      },
      error: (error) => {
        console.error('Error loading employees:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load employees. Please try again later.',
        });
      },
      complete: () => {
        console.log('Employee loading completed');
      }
    });
  }

  deleteEmployee(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.loadEmployees();
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete employee. Please try again later.',
            });
          },
          complete: () => {
            console.log('Employee deletion completed');
          }
        });
      }
    });
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageNumber = newPage;
      this.loadEmployees();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalEmployees / this.pageSize);
  }

  getPages(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
