import { nanoid } from 'nanoid';

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = content =>
  !(content.trim() === "");

// Генерация рандомного ID, в формате "prefix_рандомнаяСтрокаИзNanoID"
export const generateKey = prefix => {
  return `${prefix || "ID"}_${nanoid()}`;
};

// Поиск индекса todo в массиве по значению id
export const searchTodoById = (todoArray, id) => todoArray.findIndex(todo => todo.id === id);
