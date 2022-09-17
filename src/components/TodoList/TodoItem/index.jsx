import styled from 'styled-components';

import { removeTodo } from '@/state/TodosState';

const StyledTodo = styled.div`
  padding: 1rem;
  background-color: #d4d4d4;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  border: 1px solid #777;
`;

const TodoText = styled.p`
  word-wrap: break-word;
`;

const TodoBtn = styled.button`
  background-color: #e8e8e8;
  height: 3rem;
`;

export const TodoItem = ({ content, todoId }) => {
  return (
    <StyledTodo>
      <TodoBtn onClick={() => removeTodo(todoId)}>Удалить</TodoBtn>
      <TodoText>{content}</TodoText>
    </StyledTodo>
  );
};
