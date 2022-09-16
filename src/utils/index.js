export const todoContentIsValid = content =>
  !(/^\s+$/g.test(content));

export const generateKey = prefix => {
  return `${prefix || 'ID'}_${new Date().getTime()}_${Math.random()}`;
};
