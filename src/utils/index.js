import { v4 as uuidv4 } from 'uuid';

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = content => !!content.trim();

// Генерация ID (для ToDo и react key)
export const generateId = () => uuidv4();

// Поиск индекса todo в массиве по значению id
export const searchTodoById = (todoArray, id) => todoArray.findIndex(todo => todo.id === id);
