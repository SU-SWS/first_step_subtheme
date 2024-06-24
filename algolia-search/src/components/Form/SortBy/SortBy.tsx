import { nanoid } from "nanoid";
import { useSortBy } from "react-instantsearch";
import { SortContainer, SortLabel, SortSelect } from "./";
import { type JSX } from 'preact';

export type SortOptions = [
  'techsource_resources',
  'techsource_resources_title_asc',
  'techsource_resources_title_desc',
];

const SortBy = () => {
  const id = nanoid();

  const searchIndex = 'techsource_resources';
  const searchIndexAsc = 'techsource_resources_title_asc';
  const searchIndexDesc = 'techsource_resources_title_desc';

  const items = [
    { value: searchIndex, label: 'Relevance' },
    { value: searchIndexAsc, label: 'A-Z' },
    { value: searchIndexDesc, label: 'Z-A' },
  ];

  const { refine, currentRefinement } = useSortBy({ items });

  const handleChange = (event: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    if (event && !!event.currentTarget) {
      refine(event.currentTarget.value);
      return;
    }
    console.error('Couldn\'t refine search results.');
  };

  return (
    <SortContainer>
      <SortLabel htmlFor={id}>Sort results by</SortLabel>
      <SortSelect id={id} value={currentRefinement} onInput={handleChange}>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </SortSelect>
    </SortContainer>
  );
};

export default SortBy;
