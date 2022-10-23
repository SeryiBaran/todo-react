import React from 'react';
import { useUnit } from 'effector-react';

import { Button, Form } from 'react-bootstrap';

import { useInput } from '@/hooks';
import { todoContentIsValid } from '@/utils';
import { todoAdded } from '@/store';

export const Controls = () => {
  const addTodo = useUnit(todoAdded);

  const [content, input, resetInputValue] = useInput();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!todoContentIsValid(content)) return;

    addTodo({ content });
    resetInputValue();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex gap-2 flex-column flex-sm-row"
    >
      <Form.Control type="text" {...input} />
      <Button type="submit">Добавить</Button>
    </Form>
  );
};
