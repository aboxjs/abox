import { getIsObject, getIsStore, checkOptions } from "../../src/utils/helper";
import { createStore } from "../../src";

function Fun() {}

describe("utils/helper", function () {
  describe("getIsObject", () => {
    it("should be true", function () {
      expect(getIsObject({})).toBeTruthy();
      expect(getIsObject(Object.create({}))).toBeTruthy();
      // @ts-ignore
      expect(getIsObject(new Fun())).toBeTruthy();
    });

    it("should be false", function () {
      expect(getIsObject(undefined)).toBeFalsy();
      expect(getIsObject(null)).toBeFalsy();
      expect(getIsObject(0)).toBeFalsy();
      expect(getIsObject("string")).toBeFalsy();
      expect(getIsObject(false)).toBeFalsy();
      expect(getIsObject(Fun)).toBeFalsy();
      expect(getIsObject([])).toBeFalsy();
      expect(getIsObject(/fun/)).toBeFalsy();
    });
  });
  describe("getIsStore", () => {
    it("should be true", function () {
      expect(getIsStore(createStore({}))).toBeTruthy();
      expect(getIsStore(createStore({}, createStore({})))).toBeTruthy();
    });

    it("should be false", function () {
      expect(getIsStore(undefined)).toBeFalsy();
      expect(getIsStore(null)).toBeFalsy();
      expect(getIsStore({})).toBeFalsy();
      expect(getIsStore([])).toBeFalsy();
      expect(getIsStore({ core: {} })).toBeFalsy();
      expect(getIsStore({ core: { a: 1 } })).toBeFalsy();
    });
  });
  describe("checkOptions", () => {
    it("should be normal", function () {
      expect(() => checkOptions({})).not.toThrow();
      expect(() => checkOptions({ a: 1 })).not.toThrow();
      expect(() => checkOptions({ a: 1, actions: {} })).not.toThrow();
      expect(() => checkOptions({ a: 1, actions: { b: 1 } })).not.toThrow();
    });

    it("should be abnormal", function () {
      expect(() => checkOptions(null)).toThrow("Options is not a object");
      expect(() => checkOptions(undefined)).toThrow("Options is not a object");
      expect(() => checkOptions([])).toThrow("Options is not a object");
      expect(() => checkOptions({ core: 1 })).toThrow(
        "Options cannot have core attribute"
      );
      expect(() => checkOptions({ actions: 1 })).toThrow(
        "Options.actions is not a object"
      );
      expect(() => checkOptions({ actions: null })).toThrow(
        "Options.actions is not a object"
      );

      expect(() => checkOptions({ actions: 1 }, true)).toThrow(
        "data cannot have actions attribute"
      );
    });
  });
});
