import styled from 'styled-components';

export type ResetLinkProps = {
  children?: preact.ComponentChildren;
};

const ResetLink = styled.a<ResetLinkProps>`
  display: inline-block;
  margin-top: 2.6rem;
  cursor: pointer;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    color: #2e2d29;
    text-decoration: underline;
  }
`;

export default ResetLink;
