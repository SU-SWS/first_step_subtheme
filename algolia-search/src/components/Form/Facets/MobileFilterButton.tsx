import styled from 'styled-components';

export type MobileFilterButtonProps = {
  children?: preact.ComponentChildren;
};

const MobileFilterButton = styled.button<MobileFilterButtonProps>`
  display: block;
  width: auto;
`;

export default MobileFilterButton;
