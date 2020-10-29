import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { eventDispatcher } from "./../store/store";
import { ActionTypes } from "./../store/action";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  authenticateionState = new BehaviorSubject(false);
  constructor(private http: HttpClient, private router: Router) {
    this.ValidateLoggedInUser();
  }
  isAuthenticated(): any {
    return this.authenticateionState.value;
  }
  login(data) {
    const url = `${environment.loginURL}people/?search=${data.username}`;
    return this.http.get(url);
  }
  loginSuccess(data) {
    eventDispatcher.next({ type: ActionTypes.LOGIN, payload: data[0] });
    this.authenticateionState.next(true);
    console.log("data", data);
    localStorage.setItem(environment.storagePrefix, JSON.stringify(data));
    this.router.navigateByUrl("home");
  }
  logout() {
    localStorage.removeItem(environment.storagePrefix);
    this.authenticateionState.next(false);
    this.router.navigateByUrl("login");
  }
  ValidateLoggedInUser() {
    const user = localStorage.getItem(environment.storagePrefix);
    if (user) {
      this.loginSuccess(JSON.parse(user));
    }
  }
}
