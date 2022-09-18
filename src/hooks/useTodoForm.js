import { useCallback, useState } from 'react';

import { todoContentIsValid } from '@/utils';

import { $todos, addTodo } from '@/state/TodosState';

export const useTodoForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();

      if (!todoContentIsValid(inputValue)) return;

      addTodo(inputValue);

      setInputValue('');
    },
    [inputValue],
  );

  return [handleSubmit, inputValue, setInputValue];
};
