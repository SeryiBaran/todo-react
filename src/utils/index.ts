import { v4 as uuidv4 } from 'uuid';

import { Todo, TodosStore } from '@/store';

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = (content: Todo['content']) =>
  !!content.trim();

// Генерация ID
export const generateId = () => uuidv4();

// Поиск индекса todo в массиве по значению id
export const searchTodoById = (todoArray: TodosStore, id: Todo['id']) =>
  todoArray.findIndex((todo: Todo) => todo.id === id);
