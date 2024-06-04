import { nanoid } from "nanoid";
import { useSortBy } from "react-instantsearch";
import styled from "styled-components";

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
`;

const SortLabel = styled.label`
  font-size: 2.3rem;
  margin-right: 1.2rem;
  margin-top: 0;
`;

const SortSelect = styled.select`
  color: #B1040E;
  border: 1px solid #B1040E;
  padding: 1.2rem 1.4rem;
  font-size: 2rem;
  cursor: pointer;
  width: auto;
  min-width: 15rem;
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
