import { Injectable } from "@angular/core";
import { FormLayout } from "projects/mainio-forms/src/lib/models";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FormLayoutService {
  private _layout = FormLayout.Col_1;

  set layout(value: FormLayout) {
    this._layout = value;

    this.layout$.next(this._layout);
  }

  get layout() {
    return this._layout;
  }

  layout$: Subject<FormLayout> = new Subject<FormLayout>();

  constructor() {}
}
