import { createStore, createEvent } from 'effector';
import { persist } from 'effector-storage/local';

import { generateKey } from '@/utils';

// Состояние по умолчанию
export const defaultTodos = [];

export const $todos = createStore(defaultTodos);

// Автоматическая синхронизация списка todo с LocalStorage
persist({ store: $todos, key: 'todos' });

// Event Listener: при добавлении todo
const onTodoAddedWithId = (state, todo) => [...state, todo];

// Event Listener: при удалении todo (передаётся id)
const onTodoRemoved = (state, id) => {
  // Копируем состояние, дабы не мутировать
  const copy = [...state];
  // Ищем индекс todo в массиве и удаляем
  const index = copy.findIndex(todo => todo.id === id);
  copy.splice(index, 1);

  return copy;
};

// Event Listener: при изменении todo (передаётся id todo и новый контент)
const onTodoEdited = (state, { id, newContent }) => {
  // Копируем состояние, дабы не мутировать
  const copy = [...state];
  // Ищем индекс todo в массиве и заменяем контент
  const index = copy.findIndex(todo => todo.id === id);
  copy[index].content = newContent;

  return copy;
};

// Prepend: генерация id для нового todo (вынесено из ивента onTodoAddedWithId)
const prependTodoAddedWithId = content => ({
  id: generateKey(),
  content,
});

// Создание ивентов
export const todoAddedWithId = createEvent();
export const todoRemoved = createEvent();
export const todoEdited = createEvent();
export const resetted = createEvent();

// Добавление prependTodoAddedWithId в todoAddedWithId
export const todoAdded = todoAddedWithId.prepend(prependTodoAddedWithId);

// Настройка обработчиков событий
$todos
  .on(todoAddedWithId, onTodoAddedWithId)
  .on(todoRemoved, onTodoRemoved)
  .on(todoEdited, onTodoEdited)
  .reset(resetted)
