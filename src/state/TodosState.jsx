import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local'

import { generateKey } from '@/utils';

export const defaultValue = [];

export const $todos = createStore(defaultValue);

persist({ store: $todos, key: 'todos' })

export const addTodo = createEvent();
export const removeTodo = createEvent();

$todos.on(removeTodo, (state, id) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo[0] === id);
  copy.splice(index, 1);
  console.log(copy);
  return copy;
});

$todos.on(addTodo, (state, content) => {
  return [...state, [generateKey(), content]];
});

$todos.watch(console.log);
