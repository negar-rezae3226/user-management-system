import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';

import { User } from '../../core/models/user.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  imports: [DxDataGridModule],
})
export class UserManagementComponent implements OnInit {
  //#region properties
  users: User[] = [];
  selectedUser: User = {} as User;
  isPopupVisible: boolean = false;
  //#endregion
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Method to load users from the UserService
  loadUsers(): void {
    this.users = this.userService.getUsers();
  }

  // Method to show the popup for editing or adding a user
  showPopup(user: User): void {
    this.selectedUser = { ...user };
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  // Method to handle form submission for adding or updating a user
  onSubmit(): void {
    if (this.selectedUser.id)
      this.userService.updateUser(this.selectedUser.id, this.selectedUser);
    else {
      this.selectedUser.id = this.users.length + 1;
      this.userService.addUser(this.selectedUser);
    }

    this.loadUsers();
    this.closePopup();
  }
}
