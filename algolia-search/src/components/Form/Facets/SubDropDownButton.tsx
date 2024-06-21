import styled from 'styled-components';

export type SubDropDownButtonProps = {
  children?: preact.ComponentChildren;
};

const SubDropDownButton = styled.button<SubDropDownButtonProps>`
  width: 100%;
  border: none;
  padding: 1.2rem 1.4rem;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2e2d29;

  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    color: #2e2d29;
    box-shadow: none;
  }
`;

export default SubDropDownButton;
