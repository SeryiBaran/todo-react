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

const TodoBtn = styled.button`
  background-color: #e8e8e8;
  height: 3rem;
`;

const removeTodo = (todosState, setTodosState, todoId) => {
  const todosCopy = todosState.todos;
  const index = todosCopy.findIndex(todo => todo[0] === todoId);
  todosCopy.splice(index, 1);
  setTodosState(state => ({
    todos: todosCopy,
  }));
};

export const TodoItem = ({ content, todoId }) => {
  const [todosState, setTodosState] = useTodosState();

  return (
    <StyledTodo>
      <TodoBtn
        onClick={() => removeTodo(todosState, setTodosState, todoId)}
      >
        Удалить
      </TodoBtn>
      <TodoText>{content}</TodoText>
    </StyledTodo>
  );
};
