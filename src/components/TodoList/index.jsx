import styled from 'styled-components';

import { generateKey } from '@/utils';

import { useTodosState } from '@/state/TodosState';

import { TodoItem } from './TodoItem';

const StyledTodoList = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TodoList = () => {
  const [todosState, setTodosState] = useTodosState();

  return (
    <StyledTodoList>
      {[...todosState.todos].reverse().map(todo => (
        <TodoItem key={generateKey()} todoId={todo[0]} content={todo[1]} />
      ))}
    </StyledTodoList>
  );
};
