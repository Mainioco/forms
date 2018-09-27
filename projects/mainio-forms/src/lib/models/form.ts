import { QuestionBase } from "./question-base";
import { FormGroup } from "@angular/forms";
import { QuestionGroup } from "./question-group";
import { IQuestionBaseOptions } from "../interfaces";

export class Form {
  public id: string;
  public questionGroups?: { key?: string; value?: QuestionGroup };
  public questions?: IQuestionBaseOptions[];
  public values?: { key: string; value: any };
  public savedValues?: { key: string; value: any };
  public mappedModel?: any;
}
