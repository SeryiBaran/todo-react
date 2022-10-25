import * as idb from 'idb-keyval';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;

const storage = {
  getItem: async function (key: string) {
    return idb.get(key);
  },
  setItem: async function (key: string, val: Value) {
    await idb.set(key, val);
  },
};

// Адаптер IDB для effector-storage
export const IDBAdapter = (key: string) => ({
  get: async (value: Value) => (await storage.getItem(key)) || value,
  set: async (value: Value) => storage.setItem(key, value),
});
