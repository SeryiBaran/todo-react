import { useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { useTodoForm } from '@/hooks';

import { Form } from './Form';
import { Submit } from './Submit';
import { Input } from './Input';

export const Controls = () => {
  const handleSubmit = useTodoForm();

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="text" />
      <Submit>Добавить</Submit>
    </Form>
  );
};
