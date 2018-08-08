import { Component, OnInit, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Form } from "../../models/form";
import * as recuders from "../reducers";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(private _store: Store<recuders.State>) {}

  get store() {
    return this._store;
  }
}
