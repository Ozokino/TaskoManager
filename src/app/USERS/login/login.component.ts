import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { response } from 'express';


@Component({
  selector: 'tasko-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private userService : UserService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Both username and password are required!';
      return;
    }

    const { username, password } = this.loginForm.value;

    this.userService.login(username, password)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/task-list']);
      },
      error: (error: Error) => {
        this.errorMessage = 'Incorrect username or password';
      }
    }); 
  }
}
