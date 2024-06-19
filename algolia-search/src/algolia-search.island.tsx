import algoliasearch from 'algoliasearch/lite';
import { createIslandWebComponent } from 'preact-island';
import { HitsProps, InstantSearch, useInfiniteHits, Configure, useInstantSearch } from 'react-instantsearch';
import FilterForm from "./filter-form";
import EventHit from "./hits/events";
import NewsHit from "./hits/news";
import DefaultHit from "./hits/default-hit";
import styled from "styled-components";
import { StanfordHit } from "./hits/hit.types";
import { SortBy } from "./sort-by";
import { FunctionComponent } from 'preact';

const islandName = 'algolia-search';
const appId = 'FKQ9KXS4B7';
const key = 'b59f434249ba65222c8973874f23095a';
const searchClient = algoliasearch(appId, key);

const Hit: FunctionComponent<{ hit: StanfordHit }> = ({ hit }) => {
  if (hit.type === 'Event') return <EventHit hit={hit} />;
  if (hit.type === 'News') return <NewsHit hit={hit} />;
  return <DefaultHit hit={hit} />;
};

const ResultsContainer = styled.ul<{ children?: preact.ComponentChildren; id?: string }>`
  list-style: none;
  padding-left: 0;
  margin-top: 5rem;
  margin-bottom: 10rem;

  @media (min-width: 768px) {
    padding-left: 6rem;
  }

  @media (min-width: 1200px) {
    padding-left: 0;
  }

  li {
    border-bottom: 1px solid #ccc;

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

const Container = styled.div<{ children?: preact.ComponentChildren }>`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  li {
    margin-bottom: 10px;

    &:last-child {
      border-bottom: none;
    }
  }

  [type=checkbox],[type=radio] {
    -webkit-clip-path: unset;
    padding: 0;
    width: 24px;
    height: 24px;
    clip: unset;
    overflow: unset;
    position: relative;
    clip-path: unset;
    margin-right: 8px;
    flex-shrink: 0;
  }

  fieldset {
    padding: 0;
  }
`;

const LoadingIndicator = styled.div<{ children?: preact.ComponentChildren }>`
  text-align: center;
  padding: 2rem;
  font-size: 1.5rem;
  color: #006CB8;
`;

const CustomHits: FunctionComponent = () => {
  const { hits, showMore, isLastPage } = useInfiniteHits<StanfordHit>();
  const { status } = useInstantSearch();

  if (status === 'loading') {
    return <LoadingIndicator>Loading...</LoadingIndicator>;
  }

  if (hits.length === 0) {
    return <p>No results for your search. Please try another search.</p>;
  }

  return (
    <ResultsContainer id="results">
      {hits.map(hit => (
        <li key={hit.objectID}>
          <Hit hit={hit} />
        </li>
      ))}
      {!isLastPage && (
        <div style={{ display: 'flex' }}>
          <button onClick={showMore} className="su-button--secondary" style={{ margin: '5rem auto' }}>
            Show more results
          </button>
        </div>
      )}
    </ResultsContainer>
  );
};

const Search: FunctionComponent = () => {
  const currentSearchParams = new URLSearchParams(window.location.search);
  const initialUiState: any = {};

  if (currentSearchParams.get('key')) {
    initialUiState.query = currentSearchParams.get('key');
  }
  if (currentSearchParams.get('page-type')) {
    initialUiState.refinementList = { basic_page_type: currentSearchParams.get('page-type')?.split(',') };
  }
  if (currentSearchParams.get('shared')) {
    initialUiState.refinementList = { shared_tags: currentSearchParams.get('shared')?.split(',') };
  }

  const searchIndex = 'techsource_resources';
  const searchIndexAsc = 'techsource_resources_title_asc';
  const searchIndexDesc = 'techsource_resources_title_desc';

  return (
    <>
      <a href="#results" className="visually-hidden">Skip to results</a>
      <InstantSearch
        searchClient={searchClient}
        indexName={searchIndexAsc}
        initialUiState={{
          [searchIndexAsc]: initialUiState,
        }}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Container>
          <FilterForm searchIndex={searchIndex} searchIndexAsc={searchIndexAsc} searchIndexDesc={searchIndexDesc} />
          <div>
            <SortBy searchIndex={searchIndex} searchIndexAsc={searchIndexAsc} searchIndexDesc={searchIndexDesc} />
            <CustomHits />
          </div>
        </Container>
      </InstantSearch>
    </>
  );
};

const island = createIslandWebComponent(islandName, Search);
island.render({
  selector: `${islandName}, #${islandName}, #resources-directory-filter`,
});
