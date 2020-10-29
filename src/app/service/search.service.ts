import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private _http: HttpClient) {}

  search(searchData) {
    return this._http.get(`${environment.searchURL}${searchData}`);
  }
}
