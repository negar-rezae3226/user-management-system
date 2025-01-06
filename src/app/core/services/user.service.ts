import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { users } from './user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //#region properties
  users: User[] = users;
  //#endregion

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
  }

  // Update an existing user
  updateUser(id: number, updatedUser: User) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) this.users[index] = updatedUser;
  }

  // Delete a user by ID
  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
