export const todoContentIsValid = content =>
  !(content.trim() === "");

export const generateKey = prefix => {
  return `${prefix || 'ID'}_${new Date().getTime()}_${Math.random()}`;
};
