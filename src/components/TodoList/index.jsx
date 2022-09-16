import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { generateKey } from '@/utils';

import { TodosState } from '@/state/TodosState';

import { Todo } from '@/components';

const StyledTodoList = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TodoList = () => {
  const [TSInstance, setTSInstance] = useRecoilState(TodosState);
  return (
    <StyledTodoList>
      {[...TSInstance.todos].reverse().map(todo => (
        <Todo key={generateKey()} todoId={todo[0]} content={todo[1]} />
      ))}
    </StyledTodoList>
  );
};
