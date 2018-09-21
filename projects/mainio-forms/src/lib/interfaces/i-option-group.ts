import { IOptions } from "./i-options";

export interface IOptionGroup {
  groupName?: string;
  groupId: string;
  options: Array<IOptions>;
}
