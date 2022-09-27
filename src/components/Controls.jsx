import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useUnit } from 'effector-react';

import { Button, Form } from 'react-bootstrap';

import { todoContentIsValid } from '@/utils';

import { todoAdded } from '@/store';

export const Controls = () => {
  // "Переименование" событий в функции (чтобы было "addTodo(args)" вместо "todoAdded(args)")
  const addTodo = useUnit(todoAdded);

  const [inputValue, setInputValue] = useState('');

  // Обёрнуто в useCallback с зависимостью "inputValue", чтобы функция не пере-создавалась лишний раз
  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();

      // Валидация значения инпута
      if (!todoContentIsValid(inputValue)) return;

      addTodo(inputValue);

      setInputValue('');
    },
    [inputValue],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex gap-2 flex-column flex-sm-row"
    >
      <Form.Control
        type="text"
        value={inputValue}
        onChange={evt => setInputValue(evt.target.value)}
        className=""
      />
      <Button type="submit" className="">
        Добавить
      </Button>
    </Form>
  );
};