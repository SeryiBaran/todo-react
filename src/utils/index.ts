import { v4 as uuidv4 } from 'uuid';

import { ITodo, ITodosStore } from '@/store';

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = (content: ITodo['content']) =>
  !!content.trim();

// Генерация ID (для ToDo и react key)
export const generateId = () => uuidv4();

// Поиск индекса todo в массиве по значению id
export const searchTodoById = (todoArray: ITodosStore, id: ITodo['id']) =>
  todoArray.findIndex((todo: ITodo) => todo.id === id);
