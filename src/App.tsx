import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { Wrapper, Controls, TodoList } from '@/components';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Тема Bootswatch Lumen для Bootstrap (https://bootswatch.com/lumen/)
import '@/bootstrap/bootstrap-lumen.min.css';

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div id="app">
          <Wrapper>
            <h1>React.js TODO</h1>
            <Controls />
            <TodoList />
          </Wrapper>
        </div>
      </PersistGate>
    </Provider>
  );
};
