import { createGlobalStyle } from 'styled-components';

// Глобальные стили (для всего приложения)
export const GlobalStyle = createGlobalStyle`
  html.optional-rem {
    // font-size: 62.5%;
    font-size: 100%;
  }
  button {
    cursor: pointer;
  }
  input,
  button {
    &:focus {
      box-shadow: 0 0 0.1rem 0.1rem #8aa1ff;
    }
  }
`;
