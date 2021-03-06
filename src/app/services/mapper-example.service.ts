import { Injectable } from "@angular/core";
import {
  IMapConfiguration,
  ILoadedValues,
  IMapConfigurationStore,
  Form
} from "mainio-forms";
import { ExampleModel } from "../models/example-model";
import { Store } from "@ngrx/store";
import { State } from "../examples/store/reducers";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MapperExampleService extends IMapConfiguration
  implements IMapConfigurationStore {
  type: string = "ExampleModel";
  mapToModelIdentifier = "ExampleModel";
  limitToForms: string[] = ["store-form", "split-form"];
  defaultModel: ExampleModel = {
    id: "",
    displayNameTitle: "",
    date: new Date(Date.now())
  };
  mappedModel$: BehaviorSubject<ExampleModel> = new BehaviorSubject<
    ExampleModel
  >(new ExampleModel());

  constructor(private _store: Store<State>) {
    super();
    this._store.select(x => x.mainioForms.mappedModels).subscribe(x => {
      if (x && x[this.mapToModelIdentifier]) {
        this.mappedModel$.next(x[this.mapToModelIdentifier]);
      }
    });
  }

  map(loadedValues: ILoadedValues, formId: string, currentValue: ExampleModel) {
    let t: ExampleModel = {
      ...this.mapSplitProperties(loadedValues, currentValue),
      ...this.mapStoreProperties(loadedValues, currentValue)
    };
    return t;
  }

  async getFromFormsStore(form: string): Promise<ExampleModel> {
    let res: Form = await this._store
      .select(x => x.mainioForms.forms[form])
      .toPromise();
    return this.map({ values: res.values }, form, undefined);
  }

  private mapStoreProperties(
    loadedValues: ILoadedValues,
    currentValue: ExampleModel
  ) {
    return {
      id: loadedValues.values.x5 || currentValue.id,
      date: loadedValues.values.x6 || currentValue.date
    };
  }
  private mapSplitProperties(
    loadedValues: ILoadedValues,
    currentValue: ExampleModel
  ) {
    return {
      displayNameTitle:
        loadedValues.values.title || currentValue.displayNameTitle
    };
  }
}
