import styled from 'styled-components';

export type MobileFilterContainerProps = {
  children?: preact.ComponentChildren;
};

const MobileFilterContainer = styled.div<MobileFilterContainerProps>`
  @media (min-width: 768px) {
    display: none;
  }
`;

export default MobileFilterContainer;
