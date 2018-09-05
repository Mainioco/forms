import { AbstractControl, ValidatorFn, FormControl } from "@angular/forms";

export interface IValidateNoSameValuesItem {
  totalCount: number;
  indexes: number[];
}

export interface IValidateNoSameValuesResult {
  [key: string]: IValidateNoSameValuesItem;
}

export function validateNoSameValuesValidator(
  control: AbstractControl
): { [s: string]: boolean } {
  let controlValues: string[] =
    typeof control.value == "string"
      ? JSON.parse(control.value)
      : control.value.constructor === Array
        ? control.value
        : typeof control.value == "object"
          ? getArrayFromObject(control.value)
          : control.value;
  let sameValues: IValidateNoSameValuesResult = {};
  let counted: number = 0;

  for (let value of controlValues) {
    let count = getAllIndexes(controlValues, value);
    if (count.length > 1 && !sameValues[value]) {
      sameValues[value] = {
        totalCount: count.length,
        indexes: count
      };
      counted++;
    }
  }

  if (counted > 0) {
    control.setErrors({ incorrect: true });
    return {
      s: true
    };
  }
  return null;
}

function getAllIndexes(arr, val): number[] {
  if (!arr || !val) {
    return [];
  }
  var indexes: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      indexes.push(i);
    }
  }
  return indexes;
}

function getArrayFromObject(object: Object) {
  let keys = Object.keys(object);
  return JSON.parse(object[keys[0]]);
}
