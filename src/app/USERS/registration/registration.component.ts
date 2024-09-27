import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../service/user.service';
import { takeUntil } from 'rxjs/operators';
import { response } from 'express';

@Component({
  selector: 'tasko-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss' 
})
export class RegistrationComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  registrationForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService: UserService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName : ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void { }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  register() {
    
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    const newUser: User = {...this.registrationForm.value};
    console.log('Attempting to register user:', newUser);
    this.userService.register(newUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {

        alert('Registration was successful! Redirecting to login!');
        
        this.registrationForm.reset();
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registration failed. Please try again.');
        console.error('Error during registration:', error);
      }
    );
  }
}

