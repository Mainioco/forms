import { Component, OnInit, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Form } from "../../models/form";
import * as recuders from "../index";
import * as libraryActions from "../actions/library-actions";
import * as lifecycleActions from "../actions/form-lifecycle-actions";
import { QuestionBase } from "../../models/question-base";
import { FormGroupService } from "../../services/form-group.service";
import { FormGroup } from "@angular/forms";
import { QuestionCreatorService } from "../../services/question-creator.service";
import { QuestionGroup } from "../../models/question-group";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(
    private _store: Store<recuders.MainioFormsState>,
    private _formGroupService: FormGroupService,
    private _creatorService: QuestionCreatorService
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

  formValuesChanged(id: string, formGroup: FormGroup) {
    let form: Form = this.store.select(x => x.lifecycle.forms)[id];
    console.log("id", id, this.store.select(x => x.lifecycle.forms));
    this.store.dispatch(
      new lifecycleActions.ValueChanged({
        formId: id,
        newValues: formGroup.value
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
    let groups: QuestionGroup[] = [];
    for (let q of questions) {
      f.questions.push(q);
      if (limitToGroup && q.group !== limitToGroup) {
        continue;
      }
      if (!q.group) {
        continue;
      }
      let g = groups.find(x => x.group == q.group);
      if (!g) {
        g = {
          group: q.group,
          questionsIds: []
        };
        groups.push(g);
      }
      g.questionsIds.push(q.key);
    }
    f.questionGroups = [...groups];

    this.createForm(f);

    return limitToGroup
      ? f.questions.filter(x => x.group === limitToGroup)
      : f.questions;
  }

  createFromGroup(form: Form) {}
}
