import styled from 'styled-components';

import { useTodosState } from '@/state/TodosState';

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

export const TodoItem = ({ content, todoId }) => {
  const [todosState, setTodosState] = useTodosState();

  const removeTodo = () => {
    const todosCopy = todosState.todos;
    const index = todosCopy.findIndex(todo => todo[0] === todoId);
    todosCopy.splice(index, 1);
    setTodosState(state => ({
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
