import { Component, OnInit, Injectable, Inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Form } from "../../models/form";
import * as libraryActions from "../actions/library-actions";
import * as lifecycleActions from "../actions/form-lifecycle-actions";
import { QuestionBase } from "../../models/question-base";
import { FormGroupService } from "../../services/form-group.service";
import { FormGroup } from "@angular/forms";
import { QuestionCreatorService } from "../../services/question-creator.service";
import { QuestionGroup } from "../../models/question-group";
import { LifecycleState } from "../states/forms-state";
import { MainioFormStoreServiceConfig } from "../tokens/service-config";
import { MainioFormsStoreConfig } from "../interfaces/store-config";
import {
  IFormGroupCreator,
  IFormCreationOptions,
  IFormGroupCreatedResult
} from "../../interfaces/i-form-group-creator";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StoreService implements IFormGroupCreator {
  constructor(
    private _store: Store<LifecycleState>,
    private _formGroupService: FormGroupService,
    private _creatorService: QuestionCreatorService,
    @Inject(MainioFormStoreServiceConfig) private config: MainioFormsStoreConfig
  ) {}

  get store() {
    return this._store;
  }

  set store(val) {
    this._store = val;
  }

  public createFormGroupFromQuestions(
    questions: QuestionBase<any>[],
    data: IFormCreationOptions
  ): IFormGroupCreatedResult {
    if (!data.id) {
      throw new Error("Dynamic store requires formId to be set");
    }
    let res = this.createFormFromQuestions(
      data.id,
      questions,
      data.limitToGroup
    );
    return {
      questionsUsed: res,
      formGroup: this._formGroupService.InitializeGroup(
        res,
        data ? data.values : undefined
      )
    };
  }

  isStoreFormValid(id:string):Observable<boolean>
  {
    let obs = new Subject<boolean>();
    this.store.select(x=> x.forms).subscribe(x=>{
       let f:Form = x[id];
       obs.next(this.isFormValid(f));
    })
    return obs;
  }

  isFormValid(form:Form)
  {
    if(!form.questionGroups)
    {
      return true;
    }
    let keys = Object.keys(form.questionGroups);
    for(let x of keys)
    {
      let qg:QuestionGroup = form.questionGroups[x];
      if(!qg.isValid)
      {
        return false;
      }
    }
    return true;
  }

  public createForm(form: Form) {
    this.store.dispatch(new lifecycleActions.Created(form));
  }

  formValuesChanged(id: string, formGroup: FormGroup, groupId: string) {
    this.store.dispatch(
      new lifecycleActions.ValueChanged({
        formId: id,
        newValues: formGroup.value,
        groupIsValid: !formGroup.invalid,
        groupId: groupId
      })
    );
  }

  createFormFromQuestions(
    id: string,
    questions: QuestionBase<any>[],
    limitToGroup: string = undefined
  ): QuestionBase<any>[] {
    let f: Form = new Form();
    f.id = id;
    f.questions = [];
    f.values = undefined;
    for (let q of questions) {
      f.questions.push(q);
      if (!q.group) {
        continue;
      }
      let g: QuestionGroup = f.questionGroups
        ? f.questionGroups[q.group]
        : undefined;
      if (!g) {
        g = {
          group: q.group,
          questionsIds: [],
          isValid: false
        };
        if (!f.questionGroups) {
          f.questionGroups = {};
        }
        f.questionGroups[q.group] = g;
      }
      g.questionsIds.push(q.key);
    }
    this.createForm(f);

    return limitToGroup
      ? f.questions.filter(x => x.group === limitToGroup)
      : f.questions;
  }

  private getStore() {
    if (!this.config) {
      return "forms";
    }
    return this.config.storeName;
  }
}
