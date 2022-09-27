import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

import { generateId, searchTodoById } from '@/utils';

/*
Схема (для тупеньких)

{
  id: "<UUID>",
  content: "<CONTENT>",
}
*/

export interface ITodo {
  id: string;
  content: string;
}

export type ITodosStore = ITodo[];

// Состояние по умолчанию
export const defaultTodos = [];

export const $todos = createStore<ITodosStore>(defaultTodos);

// Автоматическая синхронизация списка todo с LocalStorage
persist({ store: $todos, key: 'todos' });

// Event Listener: при добавлении todo
const onTodoAddedWithId = (state: ITodosStore, todo: ITodo) => [...state, todo];

// Event Listener: при удалении todo (передаётся id)
const onTodoRemoved = (state: ITodosStore, id: ITodo['id']) =>
  state.filter((todo: ITodo) => todo.id !== id);

// Event Listener: при изменении todo (передаётся id todo и новый контент)
const onTodoEdited = (
  state: ITodosStore,
  { id, content }: { id: ITodo['id']; content: ITodo['content'] },
) => {
  const copy = [...state];

  const index = searchTodoById(copy, id);
  copy[index].content = content;

  return copy;
};

// Prepend: генерация id для нового todo (вынесено из ивента onTodoAddedWithId)
const prependTodoAddedWithId = (settings: Omit<ITodo, 'id'>): ITodo => ({
  id: generateId(),
  ...settings,
});

// Создание ивентов
export const todoAddedWithId = createEvent<ITodo>();
export const todoRemoved = createEvent<ITodo['id']>();
export const todoEdited = createEvent<ITodo>();
export const resetted = createEvent();

// Добавление prependTodoAddedWithId в todoAddedWithId
export const todoAdded = todoAddedWithId.prepend(prependTodoAddedWithId);

// Настройка обработчиков событий
$todos
  .on(todoAddedWithId, onTodoAddedWithId)
  .on(todoRemoved, onTodoRemoved)
  .on(todoEdited, onTodoEdited)
  .reset(resetted);
