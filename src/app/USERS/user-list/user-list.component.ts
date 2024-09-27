import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../service/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'tasko-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
  users: User[] = [];
  private destroy$: Subject<void> = new Subject<void>();
black: any;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUsers(): void {
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: User[]): void => {
          this.users = response;
        },
        error: (error: Error) => {
          console.error('Error fetching users:', error);
        }
      });
  }



  viewUserDetails(userId: string): void {
    this.router.navigate(['/user-details', userId]);
  }
}
