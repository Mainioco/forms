import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as lifecycleActions from "../actions/form-lifecycle-actions";
import { StoreService } from "../services/store.service";
import { startWith, switchMap } from "rxjs/operators";

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
export class FormLifecycleEffects {
  constructor(private actions$: Actions, private _storeService: StoreService) {}

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<lifecycleActions.Created>(
      lifecycleActions.MainioLifecycleActionTypes.Created
    ),
    map(x => {
      this._storeService.setCreatedForm(x.payload);
      return new lifecycleActions.EffectRun();
    })
  );
}
