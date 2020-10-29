import { Component, OnInit } from "@angular/core";
import { eventDispatcher, store } from "./../../store/store";
import { ActionTypes } from "./../../store/action";
import { AuthenticationService } from "src/app/service/authentication.service";
import { environment } from "src/environments/environment";
import { SearchService } from "src/app/service/search.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  UserDetail: any;
  constructor(
    private _auth: AuthenticationService,
    private _search: SearchService
  ) {
    store.subscribe((state) => {
      const { loginUser } = state;
      this.UserDetail = loginUser;
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem(environment.storagePrefix);
    this.UserDetail = JSON.parse(user)[0];
    console.log("this.UserDetail ===>", this.UserDetail);
  }
  /**
   * search text
   */
  searchText: string;
  searchResult: [] = [];
  doSearch() {
    eventDispatcher.next({ type: ActionTypes.LOADING, payload: true });
    this._search.search(this.searchText).subscribe(
      (res: any) => {
        console.log("res", res);
        eventDispatcher.next({ type: ActionTypes.LOADING, payload: false });
        this.searchResult = res.results;
      },
      (err) => {
        eventDispatcher.next({ type: ActionTypes.LOADING, payload: true });
        console.error(err);
      }
    );
  }

  doLogout(event) {
    event.preventDefault();
    this._auth.logout();
  }
}
