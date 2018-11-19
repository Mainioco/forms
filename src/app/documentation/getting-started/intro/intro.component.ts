import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "mainio-form-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.css"]
})
export class IntroComponent implements OnInit {
  content$: Observable<any>;
  constructor(private _acr: ActivatedRoute, private _http: HttpClient) {}

  ngOnInit() {
    this.content$ = this._acr.queryParams.pipe(
      switchMap(x => {
        return this._http.get<any>(
          "../assets/documentation/getting-started/" + x["p"] + ".md",
          { responseType: "text" } as any
        );
      })
    );
  }
}
