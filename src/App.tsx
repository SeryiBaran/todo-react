import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Тема Bootswatch Lumen для Bootstrap (https://bootswatch.com/lumen/)
import '@/bootstrap/bootstrap-lumen.min.css';

import { Wrapper, Controls, TodoList } from '@/components';

export const App = () => {
  return (
    <div id="app">
      <Wrapper>
        <h1>React.js TODO</h1>
        <Controls />
        <TodoList />
      </Wrapper>
    </div>
  );
};
