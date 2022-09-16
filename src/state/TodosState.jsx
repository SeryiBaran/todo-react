import { useState, createContext, useContext, useMemo } from 'react';

export const defaultValue = {
  todos: [],
};

export const TodosContext = createContext();

export const TodosProvider = props => {
  const [todos, setTodos] = useState(defaultValue);
  const value = useMemo(() => [todos, setTodos], [todos]);
  return <TodosContext.Provider value={value} {...props} />;
};

export const useTodosState = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error(`useTodosState must be used within a TodosProvider`);
  }
  return context;
};
