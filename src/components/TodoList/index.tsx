import { useStore } from 'effector-react';

import { $todos, ITodo } from '@/store';

import { TodoItem } from '@/components/TodoItem';

import styles from './index.module.css';

export const TodoList = () => {
  const todos = useStore($todos);

  return (
    <div className={styles.list}>
      {/*Использован rest оператор, дабы не мутировать состояние*/}
      {/*Использован метод .reverse, чтобы тудушки шли снизу вверх*/}
      {!!todos &&
        [...todos]
          .reverse()
          .map((todo: ITodo) => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};
