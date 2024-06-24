import styled from "styled-components";

export type FilterDropdownButtonProps = {
  isOpen: boolean;
  children?: preact.ComponentChildren;
};

const FilterDropdownButton = styled.button.attrs<{ $isOpen?: boolean; }>((props: { $isOpen: boolean; }) => ({
  isOpen: props.$isOpen,
}))`
  width: 100%;
  border: 1px solid #B1040E;
  padding: 1.2rem 1.4rem;
  background-color: ${({ isOpen }) => (isOpen ? '#B1040E' : '#fff')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  color: ${({ isOpen }) => (isOpen ? '#fff' : '#B1040E')};

  &:hover,
  &:focus,
  &:active {
    color: ${({ isOpen }) => (isOpen ? '#fff' : '#B1040E')};
    background-color: ${({ isOpen }) => (isOpen ? '#B1040E' : '#fff')};
  }

  &::before {
    background: ${({ isOpen }) => (isOpen ? 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" %3E%3Cpath d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8 4.22 10.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /%3E%3C/svg%3E");' : 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" %3E%3Cpath fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /%3E%3C/svg%3E");')};
  }
`;

export default FilterDropdownButton;
