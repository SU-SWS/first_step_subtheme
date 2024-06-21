import styled from "styled-components";

export type DesktopFilterProps = {
  children?: preact.ComponentChildren;
};

const DesktopFilter = styled.div<DesktopFilterProps>`
  display: none;

  @media (min-width: 768px) {
    display: block;
    margin-top: 9.8rem;
  }
`;

export default DesktopFilter;
