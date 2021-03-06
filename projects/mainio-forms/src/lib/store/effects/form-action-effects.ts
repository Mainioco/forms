import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs/operators";
import * as lifecycleActions from "../actions/form-lifecycle-actions";
import { StoreService } from "../services/store.service";
import { startWith, switchMap } from "rxjs/operators";
import { FormDataMapperService } from "../../services/form-data-mapper.service";
import { LifecycleState } from "../states/forms-state";
import { QuestionDisplayValidatorService } from "../../services/question-display-validator.service";
import { QuestionBase } from "../../models";

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable({
  providedIn: "root"
})
export class FormActionEffects {
  constructor(
    private actions$: Actions,
    private _mapper: FormDataMapperService,
    private _displayValidator: QuestionDisplayValidatorService,
    private _store: Store<any>,
    private _storeService: StoreService
  ) {}

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<lifecycleActions.ValueChanged>(
      lifecycleActions.MainioLifecycleActionTypes.ValueChanges
    ),
    withLatestFrom(this._store),
    map(([x, store]) => {
      if (this._mapper.hasMapper(x.payload.modelType)) {
        return new lifecycleActions.UpdateMappedModelAction({
          formId: x.payload.formId,
          model: this._mapper.map(
            x.payload.modelType,
            x.payload.formId,
            {
              values: x.payload.newValues
            },
            this.getCurrentModel(
              store,
              x.payload.modelType,
              x.payload.formId,
              this._mapper.getMapperModelIdentifier(x.payload.modelType)
            )
          ),
          modelIdentifier: this._mapper.getMapperModelIdentifier(
            x.payload.modelType
          )
        });
      }
      return new lifecycleActions.EffectRun();
    })
  );

  private getCurrentModel(
    store: Store<any>,
    mapperType: string,
    formId: string,
    modelIdentifier: string
  ) {
    let lif: LifecycleState = store[this._storeService.getStoreName()];
    if (lif.mappedModels && lif.mappedModels[modelIdentifier]) {
      return lif.mappedModels[modelIdentifier];
    }
    if (lif.forms && lif.forms[formId] && lif.forms[formId].mappedModel) {
      return lif.forms[formId].mappedModel;
    }
    return this._mapper.getMapperDefaultModel(mapperType);
  }
}
