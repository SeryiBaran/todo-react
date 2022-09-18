import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useTodoForm } from '@/hooks';

import { Form } from './Form';
import { Submit } from './Submit';
import { Input } from './Input';

export const Controls = () => {
  const [handleSubmit, inputValue, setInputValue] = useTodoForm();

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
