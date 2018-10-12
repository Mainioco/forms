import { Component, OnInit } from "@angular/core";
import {
  QuestionBase,
  QuestionCreatorService,
  ILoadedValues
} from "mainio-forms";
import { Form, QuestionControlService, StoreService } from "mainio-forms";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { State } from "../store/reducers";
import { Store } from "@ngrx/store";
import { LoadedValuesAction } from "projects/mainio-forms/src/public_api";
import { MapperExampleService } from "../../services/mapper-example.service";

@Component({
  selector: "mainio-form-split-store",
  templateUrl: "./split-store-form.component.html",
  styleUrls: ["./split-store-form.component.css"]
})
export class SplitStoreFormComponent implements OnInit {
  questionsToPass: QuestionBase<any>[] = [];
  idToPass: string;
  questionsToPass2: QuestionBase<any>[];
  idToPass2: string;
  values$: Subject<ILoadedValues> = new Subject<ILoadedValues>();
  constructor(
    private _http: HttpClient,
    private qcs: QuestionControlService,
    private store: Store<State>,
    private _creator: QuestionCreatorService,
    private _mapper: MapperExampleService
  ) {}
  async ngOnInit() {
    this._mapper.getFromFormsStore("store-form");
    this.store.select(x => x.mainioForms.forms).subscribe(x => {
      let f: Form = x["split-form"];
      if (f) {
        this.values$.next({
          values: {
            ...f.values
          }
        });
      }
    });
    this.loadSubTemplates("background-questions");
    this.loadSubTemplates("main-questions");
  }

  loadSubTemplates(name: string) {
    this._http
      .get("/assets/examples/store-split/" + name + ".json")
      .subscribe((x: Form) => {
        this.idToPass = x.id;
        this.questionsToPass = [
          ...this.questionsToPass,
          ...x.questions.map(q => {
            return this._creator.createQuestionFromControlType(
              q.controlType,
              q
            );
          })
        ];
      });
  }

  loadExternalValues() {
    this._http
      .get("/assets/examples/store-split/values.json")
      .subscribe((x: any) => {
        this.store.dispatch(
          new LoadedValuesAction({
            form: { id: "split-form" },
            values: x.values
          })
        );
      });
  }
}
