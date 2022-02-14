import { createStore, getIsStore, getIsObject, throwError } from "../src";
import { createStore as _createStore } from "../src/modules/store";
import {
  getIsObject as _getIsObject,
  getIsStore as _getIsStore,
} from "../src/utils/helper";
import { throwError as _throwError } from "../src/utils/throwError";

describe("index", function () {
  describe("export", function () {
    it("test export", () => {
      expect(createStore).toBe(_createStore);
      expect(getIsStore).toBe(_getIsStore);
      expect(getIsObject).toBe(_getIsObject);
      expect(throwError).toBe(_throwError);
    });
  });
});
