import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe(
        (data) => {
          this.employee = data;
        },
        (error) => {
          console.error('Error fetching employee details:', error);
          this.router.navigate(['/employees']);
        }
      );
    }
  }

  deleteEmployee(id: number): void {
    // SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this employee? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms deletion, call the service to delete the employee
        this.employeeService.deleteEmployee(id).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'The employee has been deleted successfully.',
            icon: 'success',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/employees']);
          });
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an error deleting the employee.',
            icon: 'error',
            confirmButtonColor: '#3085d6'
          });
        });
      }
    });
  }
}
