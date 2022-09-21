// Проверка валидности содержимого для контента в todo
export const todoContentIsValid = content =>
  !(content.trim() === "");

// Генерация рандомного ID, в формате "ID_времяВМиллисекундах_рандомноеЧисло"
export const generateKey = prefix => {
  return `${prefix || 'ID'}_${new Date().getTime()}_${Math.random()}`;
};

// Поиск индекса todo в массиве по значению id
export const searchTodoById = (todoArray, id) => todoArray.findIndex(todo => todo.id === id);
