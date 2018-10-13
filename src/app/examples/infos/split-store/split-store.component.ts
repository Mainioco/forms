import { Component, OnInit } from "@angular/core";
import { MapperExampleService } from "../../../services/mapper-example.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../../store/reducers";
import { ClearMappedModelAction } from "mainio-forms";

@Component({
  selector: "mainio-form-split-store-info",
  templateUrl: "./split-store.component.html",
  styleUrls: ["./split-store.component.css"]
})
export class SplitStoreComponent implements OnInit {
  model: Observable<any>;
  constructor(
    private _mapper: MapperExampleService,
    private _store: Store<State>
  ) {}

  ngOnInit() {
    this.model = this._mapper.mappedModel$;
  }

  clearMappedModel() {
    this._store.dispatch(
      new ClearMappedModelAction({
        formId: "split-store",
        model: {},
        modelIdentifier: "ExampleModel"
      })
    );
  }
}
