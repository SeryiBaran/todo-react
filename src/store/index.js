import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

import { generateKey } from '@/utils';

export const defaultTodos = [];

export const $todos = createStore(defaultTodos);

persist({ store: $todos, key: 'todos' });

const onTodoAddedWithId = (state, todo) => [...state, todo];
const onTodoRemoved = (state, id) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo.id === id);
  copy.splice(index, 1);
  return copy;
};
const onTodoEdited = (state, { id, newContent }) => {
  const copy = [...state];
  const index = copy.findIndex(todo => todo.id === id);
  copy[index].content = newContent;
  return copy;
};
const prependTodoAddedWithId = content => ({
  id: generateKey(),
  content,
});

export const todoAddedWithId = createEvent();
export const todoRemoved = createEvent();
export const todoEdited = createEvent();
export const resetted = createEvent();

export const todoAdded = todoAddedWithId.prepend(prependTodoAddedWithId);

$todos
  .on(todoAddedWithId, onTodoAddedWithId)
  .on(todoRemoved, onTodoRemoved)
  .on(todoEdited, onTodoEdited)
  .reset(resetted)
