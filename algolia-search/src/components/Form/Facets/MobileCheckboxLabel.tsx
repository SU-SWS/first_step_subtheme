import styled from 'styled-components';

export type MobileCheckboxLabelProps = {
  children?: preact.ComponentChildren;
};

const MobileCheckboxLabel = styled.label<MobileCheckboxLabelProps>`
  margin-top: 0;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  display: flex;
  align-items: center;
  font-size: 2rem;
  width: fit-content;
`;

export default MobileCheckboxLabel;
