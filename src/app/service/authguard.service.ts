import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthguardService {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
    return this.authenticationService.isAuthenticated();
  }
}
