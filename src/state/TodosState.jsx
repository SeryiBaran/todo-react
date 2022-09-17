import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

import { generateKey } from '@/utils';

export const defaultValue = [];

export const $todos = createStore(defaultValue);

persist({ store: $todos, key: 'todos' });

export const addTodo = createEvent();
export const removeTodo = createEvent();

$todos.on(removeTodo, (state, id) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo.id === id);
  copy.splice(index, 1);
  return copy;
});

$todos.on(addTodo, (state, content) => {
  return [...state, { id: generateKey(), content }];
});
