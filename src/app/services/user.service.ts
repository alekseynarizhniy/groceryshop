import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, SubscriptionLike, map } from 'rxjs';

import { DataService } from './data.service';

import { User } from '../interfaces/users';

import { EXTRA_URL_USERS } from '../constants/links';

@Injectable()
export class UserService {
  private isAutorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private user: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: '',
    login: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  });

  constructor(private data: DataService) { }

  public getUsersFromServer(): Observable<User[]> {
    return this.data.getData(EXTRA_URL_USERS);
  }

  public checkUser(login: string, password: string): Observable<boolean> {
    return this.getUsersFromServer().pipe(map(resolve => {
      let user = resolve.find(
        (element) => element.login === login && element.password === password
      );

      if (user) {
        this.addUser(user);
        return true;
      } else {
        return false;
      }
    }));
  }

  public checkLogin(login: string): Observable<boolean> {
    return this.getUsersFromServer().pipe(map(resolve => {
      const logins: string[] = [];
      resolve.forEach((user: User) => logins.push(user.login));

      if (logins.includes(login)) {
        return true;
      } else {
        return false;
      }
    }));
  }

  public addUser(user: User): void {
    this.user.next(user);
    this.isAutorized.next(true);
  }

  public addNewUser(newUser: User): void {
    let subscribe: SubscriptionLike = this.data
      .addData(EXTRA_URL_USERS, newUser)
      .subscribe((res) => subscribe.unsubscribe());
  }

  public getAutorizationStatus(): Observable<boolean> {
    return this.isAutorized.asObservable();
  }

  public outUserAutorizationStatus(): void {
    this.isAutorized.next(false);
  }

  public getUser(): Observable<User> {
    return this.user.asObservable();
  }

  public updateUser(updatedUser: User): void {
    let subscribe: SubscriptionLike = this.data
      .updateData(EXTRA_URL_USERS + '/' + this.user.value.id, updatedUser)
      .subscribe((res) => subscribe.unsubscribe());

    this.user.next(updatedUser);
  }
}
