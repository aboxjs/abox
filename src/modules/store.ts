import { checkOptions, getIsStore } from "../utils/helper";
import { Observable } from "../utils/observe";
import { throwError } from "../utils/throwError";

export type Store<
  D extends StoreData,
  A extends StoreActions,
  BA extends StoreActions = {}
> = Readonly<D & { actions: A } & { core: StoreCore<D, A, BA> }>;
export type CommonStore = Store<StoreData, StoreActions, StoreActions>;
export type PickData<O extends StoreBaseStructure> = Omit<
  O,
  "actions" | "core"
>;
export type PickActions<O extends StoreBaseStructure> = O extends {
  actions?: infer A;
}
  ? A
  : {};

export type StoreData = Record<PropertyKey, any>;
export type StoreActions = Record<PropertyKey, any>;
type StoreCore<
  D extends StoreData,
  A extends StoreActions,
  BA extends StoreActions = {}
> = {
  baseActions: BA;
  pickData: () => D;
  updateData: (data: Partial<D>) => void;
  observeData: (
    observer: (this: Store<D, A, BA>, previousData: D) => void
  ) => StoreUnObserveData;
};

type StoreUnObserveData = () => void;
type StoreBaseStructure = StoreData & { actions?: StoreActions };

type CreateStoreOptions<
  O extends StoreBaseStructure,
  BD extends StoreData = {},
  BA extends StoreActions = {}
> = O & {
  actions?: ThisType<Store<BD & PickData<O>, BA & PickActions<O>, BA>>;
};

function createActions(store: CommonStore, actions: StoreActions) {
  Object.keys(actions).forEach((key) => {
    (store as any).actions[key] = actions[key].bind(store);
  });
}

function createCore<D extends StoreData, A extends StoreActions>(
  store: Store<D, A>
) {
  const observable = new Observable();

  const pickData: StoreCore<D, A>["pickData"] = () => {
    const newStore = { ...store } as StoreData;

    delete newStore.core;
    delete newStore.actions;

    return newStore;
  };
  const observeData: StoreCore<D, A>["observeData"] = (observer) => {
    observable.addObserver(observer);
    return () => {
      observable.removeObserver(observer);
    };
  };
  const updateData: StoreCore<D, A>["updateData"] = (data) => {
    checkOptions(data, true);

    const previousData = pickData();
    Object.assign(store, data);
    observable.notifyObservers(store, previousData);
  };

  (store as any).core = {
    pickData,
    observeData,
    updateData,
    baseActions: {},
  };
}

export function createStore<
  O extends StoreBaseStructure,
  BD extends StoreData = {},
  BA extends StoreActions = {}
>(
  options: CreateStoreOptions<O, BD, BA>,
  baseStore?: Store<BD, BA>
): Store<BD & PickData<O>, BA & PickActions<O>, BA> {
  checkOptions(options);

  let store: any;

  if (baseStore) {
    if (!getIsStore(baseStore)) {
      throwError("BaseStore is not a store");
    } else {
      const newOptions = { ...options };
      delete newOptions.actions;

      store = baseStore;
      Object.assign(store, newOptions);

      store.core.baseActions = { ...store.actions };
      createActions(store, options.actions || {});
    }
  } else {
    store = {
      ...options,
      actions: {},
    };

    createCore(store);
    createActions(store, options.actions || {});
  }

  return store;
}
