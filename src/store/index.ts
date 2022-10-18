import { createStore, createEvent, createEffect, sample } from 'effector';
import { persist } from 'effector-storage/local';

import { generateId } from '@/utils';

export interface Todo {
  id: string;
  content: string;
}

export type TodosStore = Todo[];

export type TodoWithoutID = Omit<Todo, 'id'>;

// Состояние по умолчанию
export const defaultTodos = [];

export const $todos = createStore<TodosStore>(defaultTodos);

// Автоматическая синхронизация списка todo с LocalStorage
persist({ store: $todos, key: 'todos' });

// ----------<Обработчики событий>----------

// При добавлении todo (передается todo)
const onTodoAdded = (state: TodosStore, todo: Todo) => [...state, todo];

// При удалении todo (передаётся id)
const onTodoRemoved = (state: TodosStore, id: Todo['id']) =>
  state.filter((todo: Todo) => todo.id !== id);

// При изменении todo (передаётся id todo и новый контент)
const onTodoEdited = (
  state: TodosStore,
  { id, content }: { id: Todo['id']; content: Todo['content'] },
) => state.map(todo => (todo.id === id ? { ...todo, content } : todo));

// ----------<Эффекты>----------

// Генерация id для нового todo (вынесено из обработчика ивента в эффект, дабы обработчик ивента был чистым)
const createIDFx = createEffect((data: TodoWithoutID): Todo => {
  return {
    id: generateId(),
    ...data,
  };
});

// ----------<События>----------

// Создание событий
export const todoAdded = createEvent<TodoWithoutID>();
export const todoRemoved = createEvent<Todo['id']>();
export const todoEdited = createEvent<Todo>();
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
