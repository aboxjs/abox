import { throwError } from "./throwError";
import { CommonStore } from "../modules/store";

export function getIsObject(data: any) {
  return Object.prototype.toString.call(data) === "[object Object]";
}

export function getIsStore(data: any): data is CommonStore {
  return !!data?.core?.updateData;
}

export function checkOptions(options: any, isData: boolean = false) {
  const name = isData ? "data" : "Options";

  if (!getIsObject(options)) {
    throwError(name + " is not a object");
  }
  if ("core" in options) {
    throwError(name + " cannot have core attribute");
  }
  if (isData && "actions" in options) {
    throwError(name + " cannot have actions attribute");
  }
  if ("actions" in options && !getIsObject(options.actions)) {
    throwError(name + ".actions is not a object");
  }
}
