import { useState } from 'react';
import { useUnit } from 'effector-react';

import { Button, Card, Form } from 'react-bootstrap';

import { todoRemoved, todoEdited, Todo } from '@/store';

import styles from './index.module.css';

interface TodoItem {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItem) => {
  // "Переименование" событий в функции (чтобы было "setTodo(args)" вместо "todoEdited(args)")
  const removeTodo = useUnit(todoRemoved);
  const setTodo = useUnit(todoEdited);

  const [isEdited, setIsEdited] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(todo.content);

  // При нажатии кнопки "готово"
  const saveTodo = () => {
    // Переключение состояния "редактируется" и вызов ивента для сохранения
    setIsEdited(false);
    setTodo({ id: todo.id, content: textAreaValue });
  };

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
            {isEdited ? 'Готово' : 'Изменить'}
          </Button>
        </div>
        {isEdited ? (
          <Form.Control
            as="textarea"
            value={textAreaValue}
            onChange={evt => setTextAreaValue(evt.target.value)}
          />
        ) : (
          <pre className={styles.contentPre}>{todo.content}</pre>
        )}
      </Card.Body>
    </Card>
  );
};
