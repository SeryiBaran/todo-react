import { createStore, createEvent, createApi } from 'effector';
import { persist } from 'effector-storage/local';

import { useId } from 'react';

import { generateKey } from '@/utils';

export const defaultValue = [];

export const $todos = createStore(defaultValue);

persist({ store: $todos, key: 'todos' });

export const api = createApi($todos, {
  removeTodo: (state, id) => {
    const copy = [...state];
    const index = copy.findIndex(todo => todo.id === id);
    copy.splice(index, 1);
    return copy;
  },
  addTodo: (state, content) => [...state, { id: generateKey(), content }],
});
