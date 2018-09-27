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
import { QuestionBase } from "../../models/question-base";
import { QuestionCreatorService } from "../../services/question-creator.service";

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
export class FormActionDisplayEffects {
  constructor(
    private actions$: Actions,
    private _mapper: FormDataMapperService,
    private _displayValidator: QuestionDisplayValidatorService,
    private _store: Store<any>,
    private _storeService: StoreService,
    private _questionCreator: QuestionCreatorService
  ) {}

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<lifecycleActions.ValueChanged>(
      lifecycleActions.MainioLifecycleActionTypes.ValueChanges
    ),
    withLatestFrom(this._store),
    map(([x, store]) => {
      let questions =
        store[this._storeService.getStoreName()].forms[x.payload.formId]
          .questions || [];
      let indexesToChange: number[] = [];
      let i = 0;
      for (let q of questions) {
        let change = this._displayValidator.validate(
          x.payload.formId,
          q,
          questions
        );
        if (change !== q.hidden) {
          indexesToChange.push(i);
        }
        i++;
      }
      if (indexesToChange.length > 0) {
        let newQuestions: QuestionBase<any>[] = [];
        indexesToChange.forEach(x => newQuestions.push({ ...questions[x] }));
        return new lifecycleActions.QuestionsUpdated({
          form:
            store[this._storeService.getStoreName()].forms[x.payload.formId],
          newQuestions: newQuestions.map((x: QuestionBase<any>) => {
            let t: QuestionBase<
              any
            > = this._questionCreator.createQuestionFromControlType(
              x.controlType,
              {
                ...x,
                hidden: x.hidden !== undefined ? !x.hidden : true
              }
            );
            return t;
          })
        });
      }
      return new lifecycleActions.EffectRun();
    })
  );
}
