import styled from 'styled-components';
import { useStore } from 'effector-react';

import { $todos } from '@/store';

import { TodoItem } from './TodoItem';

const StyledTodoList = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TodoList = () => {
  const todos = useStore($todos);

  // Использован rest оператор, дабы не мутировать состояние
  // Использован метод .reverse, чтобы тудушки шли снизу вверх
  const items = [...todos]
    .reverse()
    .map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ));

  return <StyledTodoList>{items}</StyledTodoList>;
};
