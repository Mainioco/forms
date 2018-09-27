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
import { Observable, Subject, of } from "rxjs";
import { take, find } from "rxjs/operators";
import { catchError, map, mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class StoreService implements IFormGroupCreator {
  private _createdStores: string[] = [];
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

  public setCreatedForm(form: Form) {
    if (!this._createdStores) {
      this._createdStores = [];
    }
    this._createdStores.push(form.id);
  }

  public hasFormWithId(id: string): boolean {
    return !!this._createdStores.find(x => x == id);
  }

  public async createFormGroupFromQuestions(
    questions: QuestionBase<any>[],
    data: IFormCreationOptions,
    isNew: boolean
  ): Promise<IFormGroupCreatedResult> {
    if (!data.id) {
      throw new Error("Dynamic store requires formId to be set");
    }
    let res: IFormGroupCreatedResult = await this.createFormFromQuestions(
      data.id,
      questions,
      data.limitToGroup,
      isNew
    );
    return res;
  }

  saveForm(id: string) {
    this.store.dispatch(new lifecycleActions.SaveValuesAction({ id: id }));
  }

  resetForm(id: string) {
    this.store.dispatch(new lifecycleActions.ValueReset({ form: { id: id } }));
  }

  clearForm(id: string) {
    this.store.dispatch(new lifecycleActions.ClearValuesAction({ id: id }));
  }

  isStoreFormValid(id: string): Observable<boolean> {
    let obs = new Subject<boolean>();
    let subs = this.getFormState(id).subscribe(
      (x: { id: string; form: Form }) => {
        if (!x[id]) {
          obs.next(false);
        } else obs.next(this.isFormValid(x[id]));
        setTimeout(() => {
          subs.unsubscribe();
        }, 10);
      }
    );
    return obs;
  }

  isFormValid(form: Form) {
    if (!form) return false;
    if (!form.questionGroups) {
      return true;
    }
    let keys = Object.keys(form.questionGroups);
    for (let x of keys) {
      let qg: QuestionGroup = form.questionGroups[x];
      if (!qg.isValid) {
        return false;
      }
    }
    return true;
  }

  public async createForm(
    form: Form,
    withQuestions: QuestionBase<any>[],
    isNew: boolean
  ): Promise<IFormGroupCreatedResult> {
    let promise = new Promise<IFormGroupCreatedResult>(resolve => {
      if (!this.hasFormWithId(form.id)) {
        this.store.dispatch(new lifecycleActions.Created(form));
        let t: IFormGroupCreatedResult = {
          questionsUsed: withQuestions,
          formGroup: this._formGroupService.InitializeGroup(
            withQuestions,
            undefined
          )
        };
        resolve(t);
      } else {
        this.store.dispatch(
          new lifecycleActions.QuestionsUpdated({
            form: form,
            newQuestions: withQuestions
          })
        );

        this.store
          .select(x => x[this.getStoreName()].forms[form.id])
          .subscribe((x: Form) => {
            let fg = this._formGroupService.InitializeGroup(
              withQuestions,
              x.values
            );
            let r = {
              questionsUsed: withQuestions,
              formGroup: fg
            };
            resolve(r);
          });
      }
    });
    return promise;
  }

  formValuesChanged(
    id: string,
    formGroup: FormGroup,
    groupId: string,
    model?: string
  ) {
    this.store.dispatch(
      new lifecycleActions.ValueChanged({
        formId: id,
        newValues: formGroup.value,
        groupIsValid: !formGroup.invalid,
        groupId: groupId ? groupId : this.getDefaultGroupKey(),
        modelType: model
      })
    );
  }

  async createFormFromQuestions(
    id: string,
    questions: QuestionBase<any>[],
    limitToGroup: string = undefined,
    isNew: boolean
  ): Promise<IFormGroupCreatedResult> {
    let limitedGroup: QuestionGroup;
    let f: Form = new Form();
    f.id = id;
    f.questions = [];
    f.values = undefined;
    f.savedValues = undefined;
    for (let q of questions) {
      f.questions.push(q);
      let groupName = q.group ? q.group : this.getDefaultGroupKey();
      let g: QuestionGroup = f.questionGroups
        ? f.questionGroups[groupName]
        : undefined;

      if (!g) {
        g = {
          group: groupName,
          questionsIds: [],
          isValid: false
        };
        if (!f.questionGroups) {
          f.questionGroups = {};
        }
        f.questionGroups[groupName] = g;
        if (g.group == limitToGroup) {
          limitedGroup = g;
        }
      }
      g.questionsIds.push(q.key);
    }
    let selectedQs = limitToGroup
      ? f.questions.filter(x => x.group === limitToGroup)
      : f.questions;
    let t = await this.createForm(
      f,
      selectedQs.map(x => {
        let t: any = {
          ...x
        };
        return t;
      }),
      isNew
    );
    return t;
  }

  public getStoreName() {
    if (!this.config) {
      return "forms";
    }
    return this.config.storeName;
  }

  public getDefaultGroupKey() {
    return !this.config || !this.config.defaultFormGroupKey
      ? "no-group"
      : this.config.defaultFormGroupKey;
  }

  public getFormState(id: string): Observable<{ id: string; form: Form }> {
    return this.store.select(x => x[this.getStoreName()].forms);
  }
}
