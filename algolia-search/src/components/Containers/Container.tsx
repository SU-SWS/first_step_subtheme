import styled from 'styled-components';

export type ContainerProps = {
  children?: preact.ComponentChildren;
};

const Container = styled.div<ContainerProps>`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  li {
    margin-bottom: 10px;

    &:last-child {
      border-bottom: none;
    }
  }

  [type=checkbox],[type=radio] {
    -webkit-clip-path: unset;
    padding: 0;
    width: 24px;
    height: 24px;
    clip: unset;
    overflow: unset;
    position: relative;
    clip-path: unset;
    margin-right: 8px;
    flex-shrink: 0;
  }

  fieldset {
    padding: 0;
  }
`;

export default Container;
