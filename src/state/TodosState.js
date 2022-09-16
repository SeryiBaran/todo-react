import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'TodosStatePersist',
});

export const defaultValue = {
  todos: [["id_LOL_kjdghuikre", "Тестовое ToDo"]],
};

export const TodosState = atom({
  key: 'TodosState',
  default: defaultValue,
  effects_UNSTABLE: [persistAtom],
});
