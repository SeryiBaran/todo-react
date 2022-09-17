import styled from 'styled-components';

import '@/sb.min.css';

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
        <Controls />
        <TodoList />
      </Wrapper>
    </div>
  );
};
