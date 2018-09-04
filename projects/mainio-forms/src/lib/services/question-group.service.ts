import { Injectable } from "@angular/core";
import { QuestionBase, QuestionGroup } from "../models";

@Injectable({
  providedIn: "root"
})
export class QuestionGroupService {
  constructor() {}

  public getQuestionsWithSameGroup(
    questionsToGroup: QuestionBase<any>[],
    groupName: string
  ) {
    return questionsToGroup.filter(x => x.group == groupName);
  }
}
