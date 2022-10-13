import React from 'react';

import styles from './index.module.css';

interface IWrapper {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: IWrapper) => (
  <div className={styles.wrapper}>{children}</div>
);
