import { QuestionBase } from "./question-base";
import { FormGroup } from "@angular/forms";
import { QuestionGroup } from "./question-group";

export class Form {
  public id: string;
  public questionGroups?: { key?: string; value?: QuestionGroup };
  public questions?: QuestionBase<any>[];
  public values?: { key: string; value: any };
  public savedValues?: { key: string; value: any };
  public mappedModel?: any;
}
