import { useCallback, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUnit } from 'effector-react';

import { todoContentIsValid } from '@/utils';

import { todoAdded } from '@/store';

import { Form } from './Form';
import { Submit } from './Submit';
import { Input } from './Input';

export const Controls = () => {
  const addTodo = useUnit(todoAdded);
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

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={inputValue}
        onChange={evt => setInputValue(evt.target.value)}
      />
      <Submit>Добавить</Submit>
    </Form>
  );
};
