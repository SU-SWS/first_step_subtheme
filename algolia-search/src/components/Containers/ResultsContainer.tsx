import styled from 'styled-components';

export type ResultsProps = {
  children?: preact.ComponentChildren;
  id?: string
};

const ResultsContainer = styled.ul<ResultsProps>`
  list-style: none;
  padding-left: 0;
  margin-top: 5rem;
  margin-bottom: 10rem;

  @media (min-width: 768px) {
    padding-left: 6rem;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
  }

  li {
    border-bottom: 1px solid #ccc;

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

export default ResultsContainer;
