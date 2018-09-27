import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LibraryLoggerService {
  constructor() {}

  log(message: any, ...optionalParams: any[]) {
    if (!optionalParams) {
      console.log(`[MainioFormsLibrary] ${message}`);
      return;
    }
    console.log(`[MainioFormsLibrary] ${message}`, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    if (!optionalParams) {
      console.error(`[MainioFormsLibrary] ${message}`);
      return;
    }
    console.error(`[MainioFormsLibrary] ${message}`, optionalParams);
  }
}
