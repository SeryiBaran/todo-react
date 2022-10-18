import { createStore, createEvent, createEffect, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { generateId, searchTodoById } from '@/utils';

export interface ITodo {
  id: string;
  content: string;
}

export type ITodosStore = ITodo[];

export type ITodoWithoutID = Omit<ITodo, 'id'>;

// Состояние по умолчанию
export const defaultTodos = [];

export const $todos = createStore<ITodosStore>(defaultTodos);

// Автоматическая синхронизация списка todo с LocalStorage
persist({ store: $todos, key: 'todos' });

// ----------<Обработчики событий>----------

// При добавлении todo (передается todo)
const onTodoAdded = (state: ITodosStore, todo: ITodo) => {
  console.log(state, todo);
  return [...state, todo];
};

// При удалении todo (передаётся id)
const onTodoRemoved = (state: ITodosStore, id: ITodo['id']) =>
  state.filter((todo: ITodo) => todo.id !== id);

// При изменении todo (передаётся id todo и новый контент)
const onTodoEdited = (
  state: ITodosStore,
  { id, content }: { id: ITodo['id']; content: ITodo['content'] },
) => {
  const copy = [...state];

  const index = searchTodoById(copy, id);
  copy[index].content = content;

  return copy;
};

// ----------<Эффекты>----------

// Генерация id для нового todo (вынесено из обработчика ивента в эффект, дабы обработчик ивента был чистым)
const createIDFx = createEffect((data: ITodoWithoutID): ITodo => {
  console.log(data);
  return {
    id: generateId(),
    ...data,
  };
});

// ----------<События>----------

// Создание событий
export const todoAdded = createEvent<ITodoWithoutID>();
export const todoRemoved = createEvent<ITodo['id']>();
export const todoEdited = createEvent<ITodo>();
export const resetted = createEvent();

// ----------<Подключения и соединения>----------

// Переадресация вызова ивента в эффект (с передачей аргументов)
sample({
  clock: todoAdded,
  target: createIDFx,
});

// Настройка обработчиков
$todos
  // При завершении генерации ID, запускаем функцию добавления todo с аргументами из эффекта
  .on(createIDFx.doneData, onTodoAdded)

  // При вызове ивентов, запускаем их обработчики
  .on(todoRemoved, onTodoRemoved)
  .on(todoEdited, onTodoEdited)
  .reset(resetted);
