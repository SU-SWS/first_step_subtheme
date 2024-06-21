import styled from 'styled-components';

export type MobileResetLinkProps = {
  children?: preact.ComponentChildren;
};

const MobileResetLink = styled.a<MobileResetLinkProps>`
  text-decoration: none;
  color: #B1040E;
  align-self: center;
  font-size: 2rem;
  font-weight: 400;

  &:hover,
  &:focus,
  &:active {
    color: #2e2d29;
    text-decoration: underline;
  }
`;

export default MobileResetLink;
