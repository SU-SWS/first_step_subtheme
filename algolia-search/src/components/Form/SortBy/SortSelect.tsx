import styled from "styled-components";

export type SortSelectProps = {
  children?: preact.ComponentChildren;
};

const SortSelect = styled.select<SortSelectProps>`
  font-family: "Source Sans 3", "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #B1040E;
  border: 1px solid #B1040E;
  padding: 1.2rem 1.4rem;
  font-size: 2rem;
  cursor: pointer;
  width: auto;
  min-width: 15rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23B1040E' aria-hidden='true' data-slot='icon' height='24px' width='24px' %3E%3Cpath fillRule='evenodd' d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z' clipRule='evenodd' /%3E%3C/svg%3E");
  background-size: unset;
  margin: 0;
  line-height: 1;
`;

export default SortSelect;
