import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

import { generateKey } from '@/utils';

export const defaultValue = [];

export const $todos = createStore(defaultValue);

persist({ store: $todos, key: 'todos' });

export const todoAddedWithId = createEvent();
export const todoRemoved = createEvent();
export const todoEdited = createEvent();

$todos.on(todoAddedWithId, (state, todo) => [...state, todo]);
$todos.on(todoRemoved, (state, id) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo.id === id);
  copy.splice(index, 1);
  return copy;
});
$todos.on(todoEdited, (state, { id, newContent }) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo.id === id);
  copy[index].content = newContent;
  return copy;
});

export const todoAdded = todoAddedWithId.prepend(content => ({
  id: generateKey(),
  content,
}));
