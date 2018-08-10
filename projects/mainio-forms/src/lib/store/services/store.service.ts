import { Component, OnInit, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Form, QuestionGroup } from "../../models/form";
import * as recuders from "../reducers";
import * as libraryActions from "../actions/library-actions";
import * as lifecycleActions from "../actions/form-lifecycle-actions";
import * as formActions from "../actions/form-actions";
import { QuestionBase } from "../../models/question-base";
import { FormGroupService } from "../../services/form-group.service";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(
    private _store: Store<recuders.State>,
    private _formGroupService: FormGroupService
  ) {}

  get store() {
    return this._store;
  }

  public createForm(form: Form) {
    this.store.dispatch(new lifecycleActions.Created(form));
  }

  createFormFromQuestions(
    id: string,
    questions: QuestionBase<any>[],
    limitToGroup: string = undefined
  ): FormGroup {
    let f: Form = new Form();
    f.id = id;
    let groups: QuestionGroup[] = [];
    for (let q of questions) {
      f.questions.push(q);
      if (limitToGroup && q.group !== limitToGroup) {
        continue;
      }
      let g = groups.find(x => x.group == q.group);
      if (!g) {
        g = {
          group: g.group,
          questions: [],
          formGroup: undefined
        };
        groups.push(g);
      }
      g.questions.push(q);
    }
    f.questionGroups = [...f.questionGroups, ...groups];
    f.questionGroups.forEach(
      x => (x.formGroup = this._formGroupService.InitializeGroup(x.questions))
    );
    this.createForm(f);

    return limitToGroup
      ? f.questionGroups.find(x => x.group === limitToGroup).formGroup
      : f.questionGroups[0].formGroup;
  }

  createFromGroup(form: Form) {}
}
