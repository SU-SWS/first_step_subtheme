import styled from 'styled-components';

export type DropDownContentProps = {
  children?: preact.ComponentChildren;
};

const DropDownContent = styled.ul<DropDownContentProps>`
  padding: 0rem 1rem 1rem 2.8rem;
  margin: 0;
  list-style: none;
`;

export default DropDownContent;
