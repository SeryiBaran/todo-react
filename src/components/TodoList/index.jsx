import styled from 'styled-components';
import { useStore } from "effector-react";

import { generateKey } from '@/utils';

import { $todos, addTodo } from '@/state/TodosState';

import { TodoItem } from './TodoItem';

const StyledTodoList = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TodoList = () => {
  const todos = useStore($todos);

  return (
    <StyledTodoList>
      {[...todos].reverse().map(todo => (
        <TodoItem key={generateKey()} todoId={todo[0]} content={todo[1]} />
      ))}
    </StyledTodoList>
  );
};
