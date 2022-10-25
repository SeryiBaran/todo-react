import { useState } from 'react';
import { useUnit } from 'effector-react';

import { Button, Card, Form } from 'react-bootstrap';

import { useInput } from '@/hooks';
import { todoContentIsValid } from '@/utils';
import { todoRemoved, todoEdited, Todo } from '@/store';

import styles from './index.module.css';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const removeTodo = useUnit(todoRemoved);
  const setTodo = useUnit(todoEdited);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [newContent, newContentInput] = useInput(todo.content);

  const handleSaveTodo = () => {
    if (!todoContentIsValid(newContent)) return;

    setIsEdit(false);
    setTodo({ id: todo.id, content: newContent });
  };

  const handleEditTodo = () => {
    setIsEdit(true);
  };

  return (
    <Card className="bg-light">
      <Card.Body className="d-grid gap-2">
        <div className="d-grid gap-2">
          <Button variant="danger" onClick={() => removeTodo(todo.id)}>
            Завершено
          </Button>
          <Button
            onClick={isEdit ? handleSaveTodo : handleEditTodo}
            {...(isEdit && { variant: 'success' })}
          >
            {isEdit ? 'Готово' : 'Изменить'}
          </Button>
        </div>
        {isEdit ? (
          <Form.Control as="textarea" {...newContentInput} />
        ) : (
          <pre className={styles.contentPre}>{todo.content}</pre>
        )}
      </Card.Body>
    </Card>
  );
};
