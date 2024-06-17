import { nanoid } from "nanoid";
import { useSortBy } from "react-instantsearch";
import styled from "styled-components";

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const SortLabel = styled.label`
  font-size: 2rem;
  margin-right: 1.2rem;
  margin-top: 0;
  
  @media (min-width: 768px) {
    font-size: 2.3rem;
  }
`;

const SortSelect = styled.select`
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

type SortByProps = {
  searchIndex: string;
  searchIndexAsc: string;
  searchIndexDesc: string;
};

export const SortBy = ({ searchIndex, searchIndexAsc, searchIndexDesc }: SortByProps) => {
  const id = nanoid();

  const items = [
    { value: searchIndex, label: 'Relevance' },
    { value: searchIndexAsc, label: 'A-Z' },
    { value: searchIndexDesc, label: 'Z-A' },
  ];

  const { refine, currentRefinement } = useSortBy({ items });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    refine(event.target.value);
  };

  return (
    <SortContainer>
      <SortLabel htmlFor={id}>Sort results by</SortLabel>
      <SortSelect id={id} value={currentRefinement} onChange={handleChange}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </SortSelect>
    </SortContainer>
  );
};
