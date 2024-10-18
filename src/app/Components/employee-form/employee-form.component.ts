import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { Employee } from '../../Models/Employee';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    dateOfJoining: new Date()
  };
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(+id).subscribe((employee: Employee) => {
        this.employee = employee;
        this.employeeForm.patchValue(this.employee);
      });
    }
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      position: ['', [Validators.required, Validators.maxLength(100)]],
      dateOfJoining: ['', Validators.required]
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  saveEmployee(): void {
    if (this.employeeForm.invalid) return;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.id!, this.employeeForm.value).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Employee Updated',
          text: 'The employee information has been successfully updated!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/employees']);
        });
      });
    } else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Employee Added',
          text: 'The employee has been successfully added!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/employees']);
        });
      });
    }
  }
}
