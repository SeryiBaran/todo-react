import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { generateId } from '@/utils';

export interface Todo {
  id: string;
  content: string;
}
export type TodosStore = Todo[];
export type TodoWithoutID = Omit<Todo, 'id'>;

export const defaultTodos = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState: defaultTodos,
  reducers: {
    createTodo(
      state: TodosStore,
      { payload: data }: { payload: TodoWithoutID },
    ) {
      state.push({ id: generateId(), ...data });
    },
    setTodo(
      state: TodosStore,
      { payload: { id, ...data } }: { payload: Todo },
    ) {
      return state.map(todo => (todo.id === id ? { ...todo, ...data } : todo));
    },
    removeTodo(state: TodosStore, { payload: id }: Todo['id']) {
      return state.filter((todo: Todo) => todo.id !== id);
    },
  },
});

const rootReducer = combineReducers({
  todos: todosSlice.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export const useTodosStore = () => {
  const state = useSelector((state: RootState) => state.todos);
  const dispatch: AppDispatch = useDispatch();
  const actions = todosSlice.actions;

  return [state, dispatch, actions];
};