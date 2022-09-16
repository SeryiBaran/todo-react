import { useEffect, useMemo } from 'react';

import { generateKey, todoContentIsValid } from '@/utils';

import { useTodosState } from '@/state/TodosState';

export const useTodoForm = () => {
  const [todosState, setTodosState] = useTodosState();

  const handleSubmit = useMemo(() => evt => {
    evt.preventDefault();

    const form = evt.target;

    if (!todoContentIsValid(form.text.value)) return;

    const inputValue = form.text.value;

    setTodosState(state => {
      return {
        todos: [...state.todos, [generateKey(), inputValue]],
      };
    });

    form.text.value = '';
  });

  return handleSubmit;
};
