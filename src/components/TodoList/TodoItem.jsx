import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useUnit } from 'effector-react';

import { todoRemoved, todoEdited } from '@/store';

import { BlockButton, TextArea } from '@/components';

const StyledTodo = styled.div`
  padding: 1rem;
  background-color: #d4d4d4;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  border: 1px solid #777;
`;

const TodoText = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
  font: unset;
  padding: 0.5rem;
`;

export const TodoItem = ({ content, todoId }) => {
  // "Переименование" событий в функции (чтобы было "setTodo(args)" вместо "todoEdited(args)")
  const removeTodo = useUnit(todoRemoved);
  const setTodo = useUnit(todoEdited);

  const [isEdited, setIsEdited] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(content);

  // При нажатии кнопки "готово"
  const saveTodo = useCallback(() => {
    // Переключение состояния "редактируется" и вызов ивента для сохранения
    setIsEdited(false);
    setTodo({ id: todoId, newContent: textAreaValue });
  }, [textAreaValue]);

  return (
    <StyledTodo>
      <BlockButton onClick={() => removeTodo(todoId)}>Удалить</BlockButton>
      {!!isEdited ? (
        <BlockButton onClick={saveTodo}>Готово</BlockButton>
      ) : (
        <BlockButton onClick={() => setIsEdited(true)}>Изменить</BlockButton>
      )}
      {!!isEdited ? (
        <TextArea
          value={textAreaValue}
          onChange={evt => setTextAreaValue(evt.target.value)}
        />
      ) : (
        <TodoText>{content}</TodoText>
      )}
    </StyledTodo>
  );
};
