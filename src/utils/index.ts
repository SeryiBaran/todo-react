import { v4 as uuidv4 } from 'uuid';

import { Todo } from '@/store';

// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = (content: Todo['content']) =>
  !!content.trim();

// Генерация ID
export const generateId = () => uuidv4();
