import algoliasearch from 'algoliasearch/lite';
import { createIslandWebComponent } from 'preact-island';
import { HitsProps, InstantSearch, useInfiniteHits } from 'react-instantsearch';
import SearchForm from "./search-form";
import EventHit from "./hits/events";
import NewsHit from "./hits/news";
import DefaultHit from "./hits/default-hit";
import styled from "styled-components";
import { StanfordHit } from "./hits/hit.types";
import { SortBy } from "./sort-by";

const islandName = 'algolia-search';
const appId = 'FKQ9KXS4B7';
const key = 'b59f434249ba65222c8973874f23095a';
const searchClient = algoliasearch(appId, key);

const Hit = ({ hit }: HitsProps<StanfordHit>) => {
  if (hit.type === 'Event') return <EventHit hit={hit} />;
  if (hit.type === 'News') return <NewsHit hit={hit} />;

  return <DefaultHit hit={hit} />;
};

const ResultsContainer = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 10rem;

  @media (min-width: 768px) {
    float: right;
    width: 66%;
    padding-left: 2rem;
  }
`;

const Container = styled.div`
  li {
    margin-bottom: 10px;

    &:last-child {
      border-bottom: none;
    }
  }

  [type=checkbox],[type=radio] {
    -webkit-clip-path: unset;
    padding: 0;
    width: 12px;
    height:12px;
    clip: unset;
    overflow: unset;
    position: relative;
    clipPath: unset;
    margin-right: 8px;
  }
  fieldset {
    padding: 0;
  }
`;

const CustomHits = () => {
  const { hits, showMore, isLastPage } = useInfiniteHits();
  if (hits.length === 0) return (
    <p>No results for your search. Please try another search.</p>
  );

  // Returns results
  return (
    <ResultsContainer id="results">
      {hits.map(hit =>
        <li key={hit.objectID}>
          <Hit hit={hit} />
        </li>
      )}
      {!isLastPage &&
        <button onClick={showMore} className="su-button--secondary" style={{ marginTop: "5rem", marginLeft: "10rem" }}>
          Show more results
        </button>
      }
    </ResultsContainer>
  );
};

const Search = () => {
  const currentSearchParams = new URLSearchParams(window.location.search);

  const initialUiState = {};

  if (currentSearchParams.get('key')) {
    initialUiState.query = currentSearchParams.get('key');
  }
  if (currentSearchParams.get("page-type")) {
    initialUiState.refinementList = { basic_page_type: currentSearchParams.get("page-type").split(',') };
  }
  if (currentSearchParams.get("shared")) {
    initialUiState.refinementList = { shared_tags: currentSearchParams.get("shared").split(',') };
  }

  const searchIndex = 'techsource_resources';
  const searchIndexAsc = 'techsource_resources_title_asc';
  const searchIndexDesc = 'techsource_resources_title_desc';

  return (
    <div>
      <a href="#results" className="visually-hidden focusable">Skip to results</a>
      <InstantSearch
        searchClient={searchClient}
        indexName={searchIndexAsc}
        initialUiState={{
          [searchIndexAsc]: initialUiState,
        }}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Container>
          <SortBy 
            searchIndex={searchIndex} 
            searchIndexAsc={searchIndexAsc} 
            searchIndexDesc={searchIndexDesc} 
          />
          <SearchForm searchIndex={searchIndex} searchIndex_asc={searchIndexAsc} searchIndex_desc={searchIndexDesc} />
          <CustomHits />
        </Container>
      </InstantSearch>
    </div>
  );
};

const island = createIslandWebComponent(islandName, Search);
island.render({
  selector: `${islandName}, #${islandName}, #resources-directory-filter`,
});
