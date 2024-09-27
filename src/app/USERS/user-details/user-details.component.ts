import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tasko-user-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: User = { _id: '', firstName: '', lastName: '', username: '', password: '' };
  userForm: FormGroup;
  isEditMode = false;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private fb: FormBuilder) {

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(paramMap => {
          const userID = paramMap.get('id');
          return this.userService.getAUser(userID as string)
            .pipe(
              catchError(error => {
                console.error(error);
                this.userNotFound();
                return of(null);
              })
            );

        })
      )
      .subscribe({
        next: (response: User | null) => {
          if (response) {
            this.user = response;
            this.userForm.setValue({
              username: this.user.username,
              firstName: this.user.firstName,
              lastName: this.user.lastName
            });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  userNotFound(): void {
    alert('User not found');
    this.router.navigate(['/users']);
  }
  deleteUser(): void {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.userService.deleteAUser(this.user._id as string)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (deletedUser: User) => {
            alert(`User ${deletedUser.username} deleted successfully!`);
            this.router.navigate(['/users']);
          },
          error: (error) => {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
          }
        });
    }
  }

  editMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSave() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      this.userService.editAUser(this.user._id as string, updatedUser)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.isEditMode = false;
              this.router.navigate(['users']);
            }
          },
          error: (error) => {
            console.error('Error updating user:', error);
            alert('Failed to update the user');
          }

        });
    }
  }

}
