import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className: 'wrapper',
})`
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
