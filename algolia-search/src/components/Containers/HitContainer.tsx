import styled from 'styled-components';

export type HitContainerProps = {
  children?: preact.ComponentChildren;
};

const HitContainer = styled.article<HitContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4rem;
  padding: 2rem 0;
  margin-bottom: 2rem;

  @media (min-width: 1200px) {
    flex-direction: row;
  }

  &:first-of-type {
    padding-top: 0;
  }

  img {
    aspect-ratio: 2 / 1;
    max-width: 387px;
    max-height: 168px;
    object-fit: cover;
  }
`

export default HitContainer;
