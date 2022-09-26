import styled from 'styled-components';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '@/bootstrap.min.css';

import { GlobalStyle } from '@/styles/global';

import { Wrapper, Controls, TodoList } from '@/components';

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
