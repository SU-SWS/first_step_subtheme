import styled from 'styled-components';

export type DetailsContainerProps = {
  children?: preact.ComponentChildren;
};

const DetailsContainer = styled.div<DetailsContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`

export default DetailsContainer;
