import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

import { generateKey } from '@/utils';

export const defaultValue = [];

export const $todos = createStore(defaultValue);

persist({ store: $todos, key: 'todos' });

export const todoAdded = createEvent();
export const todoRemoved = createEvent();

$todos.on(todoRemoved, (state, id) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo.id === id);
  copy.splice(index, 1);
  return copy;
});

$todos.on(todoAdded, (state, content) => {
  return [...state, { id: generateKey(), content }];
});
