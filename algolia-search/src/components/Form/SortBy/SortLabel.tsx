import styled from 'styled-components';

export type SortLabelProps = {
  children?: preact.ComponentChildren;
};

const SortLabel = styled.label<SortLabelProps>`
  font-size: 2rem;
  margin-right: 1.2rem;
  margin-top: 0;

  @media (min-width: 768px) {
    font-size: 2.3rem;
  }
`;

export default SortLabel;
