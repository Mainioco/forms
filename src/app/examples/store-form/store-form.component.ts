import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  QuestionBase,
  QuestionCreatorService,
  ILoadedValues
} from "mainio-forms";
import { Form, QuestionControlService, StoreService } from "mainio-forms";
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription, Subject } from "rxjs";
import { State } from "../store/reducers";
import { Store } from "@ngrx/store";
import { MapperExampleService } from "../../services/mapper-example.service";
import { ExampleModel } from "../../models/example-model";

@Component({
  selector: "mainio-form-store-form",
  templateUrl: "./store-form.component.html",
  styleUrls: ["./store-form.component.css"]
})
export class StoreFormComponent implements OnInit, OnDestroy {
  questionsToPass: QuestionBase<any>[];
  idToPass: string;
  form$: Observable<{ id: string; form: Form }>;
  formValidSubscription: Subscription;
  formIsValid: boolean;
  savedValues: any;
  hasSavedValues: boolean;
  mappedModel$: Observable<ExampleModel>;
  values$: Subject<ILoadedValues> = new Subject<ILoadedValues>();
  constructor(
    private _http: HttpClient,
    private qcs: QuestionControlService,
    private _store: StoreService,
    private _creator: QuestionCreatorService,
    private store: Store<State>,
    private _mapper: MapperExampleService
  ) {}

  async ngOnInit() {
    this._http.get("/assets/examples/store-form.json").subscribe((x: Form) => {
      this.idToPass = x.id;
      this.questionsToPass = x.questions.map(q => {
        return this._creator.createQuestionFromControlType(q.controlType, q);
      });
    });
    this.form$ = this._store.getFormState("store-form");
    this.mappedModel$ = this._mapper.mappedModel$;
    this.formValidSubscription = this.form$.subscribe(x => {
      this.formIsValid = x ? this._store.isFormValid(x["store-form"]) : false;
      this.savedValues =
        x && x["store-form"] ? x["store-form"].savedValues : {};

      this.hasSavedValues =
        x && x["store-form"] ? !!x["store-form"].savedValues : false;
    });
    this.store.select(x => x.mainioForms.forms).subscribe(x => {
      let f: Form = x["store-form"];
      if (f) {
        this.values$.next({
          values: {
            ...f.values
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.formValidSubscription.unsubscribe();
  }

  save() {
    this._store.saveForm("store-form");
  }

  clear() {
    this._store.clearForm("store-form");
  }

  reset() {
    this._store.resetForm("store-form");
  }
}
