import { useMemo } from 'react';

import { todoContentIsValid } from '@/utils';

import { $todos, addTodo } from '@/state/TodosState';

export const useTodoForm = () => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;

    if (!todoContentIsValid(form.text.value)) return;

    const inputValue = form.text.value;

    addTodo(inputValue);

    form.text.value = '';
  };

  return handleSubmit;
};
