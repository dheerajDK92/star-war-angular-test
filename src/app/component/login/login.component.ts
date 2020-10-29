import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/service/authentication.service";
import { ActionTypes } from "src/app/store/action";
import { eventDispatcher } from "src/app/store/store";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  data = {
    username: null,
    password: null,
  };
  errMessage = [];
  constructor(private _auth: AuthenticationService) {}

  ngOnInit(): void {}
  doLogin(): void {
    this.errMessage = [];
    if (!this.isNull(this.data.username) && !this.isNull(this.data.password)) {
      // TODO: Need to make Search APi
      eventDispatcher.next({ type: ActionTypes.LOADING, payload: true });
      this._auth.login(this.data).subscribe(
        (res: any) => {
          if (res.results?.length === 0) {
            this.errMessage.push("Username/password is wrong.");
          } else {
            const validData = this.validateUsernamePassword(
              this.data,
              res.results
            );
            if (validData?.length == 1) {
              console.log("validData ==>", validData);
              this._auth.loginSuccess(validData);
            } else {
              this.errMessage.push("Username/password is wrong.");
            }
          }
          eventDispatcher.next({ type: ActionTypes.LOADING, payload: false });
        },
        (err) => {
          eventDispatcher.next({ type: ActionTypes.LOADING, payload: false });
          console.error("res===>", err);
        }
      );
    } else {
      if (this.isNull(this.data.username)) {
        this.errMessage.push("Please Enter Username.");
      }
      if (this.isNull(this.data.password)) {
        this.errMessage.push("Please Enter Password.");
      }
    }
  }

  validateUsernamePassword(enteredData, result) {
    return result.filter(
      (itm) =>
        itm.name === enteredData.username &&
        itm.birth_year === enteredData.password
    );
  }

  isNull(val) {
    return val === "" || val === null || val === undefined;
  }
}
