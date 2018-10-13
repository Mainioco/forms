import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "mainio-form-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  constructor(private _http: HttpClient, private _acr: ActivatedRoute) {}

  ngOnInit() {
    console.log(this._acr.snapshot.url);

    //this._http.get("../documentation/")
  }
}
