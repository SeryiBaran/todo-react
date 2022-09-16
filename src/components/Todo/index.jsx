import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { TodosState } from '@/state/TodosState';

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

const TodoRemoveBtn = styled.button`
  background-color: #e8e8e8;
  height: 3rem;
`;

export const Todo = ({ content, todoId }) => {
  const [TSInstance, setTSInstance] = useRecoilState(TodosState);

  const removeTodo = () => {
    const index = TSInstance.todos.map(e => e[0]).indexOf(todoId);
    const todosCopy = [...TSInstance.todos];
    todosCopy.splice(index, 1);
    setTSInstance(state => ({
      todos: todosCopy,
    }));
  };

  return (
    <StyledTodo>
      <TodoRemoveBtn onClick={removeTodo}>Удалить</TodoRemoveBtn>
      <TodoText>{content}</TodoText>
    </StyledTodo>
  );
};
