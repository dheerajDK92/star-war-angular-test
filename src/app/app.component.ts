import { Component, OnInit } from "@angular/core";
import { eventDispatcher, store } from "src/app/store/store";
import { ActionTypes } from "./store/action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  showLoader: boolean = false;
  title = "star-war-angular";

  constructor() {
    store.subscribe((state) => {
      const { loader } = state;
      console.log("===>", state);
      this.showLoader = Boolean(loader);
    });
  }
  ngOnInit() {
    eventDispatcher.next({ type: ActionTypes.LOGIN, payload: true });
  }
}
