import styled from 'styled-components';

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  width: 100%;
  border: 1px solid #777;
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
