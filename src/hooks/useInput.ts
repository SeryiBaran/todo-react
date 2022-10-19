import React, { useState } from 'react';

interface InputConfig {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

type Returns = [string, InputConfig, () => void];

export const useInput = (initialValue = ''): Returns => {
  const [value, setValue] = useState(initialValue);

  const resetValue = () => setValue(initialValue);

  return [
    value,
    {
      value,
      onChange: evt => setValue(evt.target.value),
    },
    resetValue,
  ];
};
