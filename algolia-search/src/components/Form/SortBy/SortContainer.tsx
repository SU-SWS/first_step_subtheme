import styled from 'styled-components';

export type SortContainerProps = {
  children?: preact.ComponentChildren;
};

const SortContainer = styled.div<SortContainerProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export default SortContainer;
