import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { generateKey, todoContentIsValid } from '@/utils';

import { TodosState } from '@/state/TodosState';

const controlsPadding = '1rem';

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  width: 100%;
  border: 1px solid #777;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Submit = styled.button`
  padding: ${controlsPadding};
  background-color: #99adff;

  &:hover {
    background-color: #a8b9ff;
  }

  &:active {
    background-color: #8099ff;
  }

  &:focus {
    box-shadow: none;
  }
`;

const Input = styled.input`
  padding: ${controlsPadding};
  width: 100%;
  background-color: #d6deff;
  &:focus {
    background-color: #e5eaff;
    box-shadow: 0 0 0.1rem 0.1rem #8aa1ff;
  }
`;

export const Controls = () => {
  const [_, setTSInstance] = useRecoilState(TodosState);

  const handleSubmit = e => {
    e.preventDefault();

    if (!todoContentIsValid(e.target.text.value)) return;

    setTSInstance(state => ({
      todos: [...state.todos, [generateKey(), e.target.text.value]],
    }));

    e.target.text.value = '';
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="text" />
      <Submit>Добавить</Submit>
    </Form>
  );
};
