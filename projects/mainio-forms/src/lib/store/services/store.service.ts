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

@Injectable({
  providedIn: "root"
})
export class StoreService {
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

  public createForm(form: Form) {
    this.store.dispatch(new lifecycleActions.Created(form));
  }

  formValuesChanged(id: string, formGroup: FormGroup, groupId: string) {
    console.log("AA", formGroup.invalid);
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
    f.questionGroups;
    for (let q of questions) {
      f.questions.push(q);
      if (limitToGroup && q.group !== limitToGroup) {
        continue;
      }
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

  createFromGroup(form: Form) {}

  private getStore() {
    if (!this.config) {
      return "forms";
    }
    return this.config.storeName;
  }
}
