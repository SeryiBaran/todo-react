import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useInput } from '@/hooks';
import { todoContentIsValid } from '@/utils';
import { useTodosStore } from '@/store';

export const Controls = () => {
  const [, dispatch, { createTodo }] = useTodosStore();

  const [content, input, resetInputValue] = useInput();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!todoContentIsValid(content)) return;

    dispatch(createTodo({ content }));
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
