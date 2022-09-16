import styled from 'styled-components';

import '@/sb.min.css';

import { TodosProvider } from '@/state/TodosState';

import { GlobalStyle } from '@/styles/global';

import { Wrapper, Controls, TodoList } from '@/components';

const Heading = styled.h1`
  text-align: center;
`;

export const App = () => {
  return (
    <div id="app">
      <GlobalStyle />
      <Wrapper>
        <h1>React.js TODO</h1>
        <TodosProvider>
          <Controls />
          <TodoList />
        </TodosProvider>
      </Wrapper>
    </div>
  );
};
