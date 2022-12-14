import { useStore } from 'effector-react';

import { $todos, Todo } from '@/store';

import { TodoItem } from '@/components/TodoItem';

import styles from './index.module.css';

export const TodoList = () => {
  const todos = useStore($todos);

  return (
    <div className={styles.list}>
      {/*Использован метод .reverse, чтобы тудушки шли снизу вверх*/}
      {todos.length > 0 ? (
        [...todos]
          .reverse()
          .map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p>ToDo кончились</p>
      )}
    </div>
  );
};
