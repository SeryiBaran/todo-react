import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useUnit } from 'effector-react';

import { Button, Card } from 'react-bootstrap';

import { todoRemoved, todoEdited, ITodo } from '@/store';

import { TextArea } from '@/components';

interface ITodoItem {
  todo: ITodo;
}

const TodoText = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
  font: unset;
  padding: 0.5rem;
  margin: 0;
`;

export const TodoItem = ({ todo }: ITodoItem) => {
  // "Переименование" событий в функции (чтобы было "setTodo(args)" вместо "todoEdited(args)")
  const removeTodo = useUnit(todoRemoved);
  const setTodo = useUnit(todoEdited);

  const [isEdited, setIsEdited] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(todo.content);

  // При нажатии кнопки "готово"
  const saveTodo = useCallback(() => {
    // Переключение состояния "редактируется" и вызов ивента для сохранения
    setIsEdited(false);
    setTodo({ id: todo.id, content: textAreaValue });
  }, [textAreaValue]);

  return (
    <Card className="bg-light">
      <Card.Body className="d-grid gap-2">
        <div className="d-grid gap-2">
          <Button variant="danger" onClick={() => removeTodo(todo.id)}>
            Завершено
          </Button>
          <Button
            onClick={() => setIsEdited(true)}
            {...(!!isEdited && { variant: 'success', onClick: saveTodo })}
          >
            {!!isEdited ? 'Готово' : 'Изменить'}
          </Button>
        </div>
        {!!isEdited ? (
          <TextArea
            value={textAreaValue}
            onChange={evt => setTextAreaValue(evt.target.value)}
          />
        ) : (
          <TodoText>{todo.content}</TodoText>
        )}
      </Card.Body>
    </Card>
  );
};
