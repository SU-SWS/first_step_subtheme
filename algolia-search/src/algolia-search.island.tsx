import algoliasearch from 'algoliasearch/lite';
import { createIslandWebComponent } from 'preact-island';
import { InstantSearch } from 'react-instantsearch';
import FilterForm from "./components/Form/FilterForm";
import { SortBy } from "./components/Form/SortBy";
import { Container } from './components/Containers';
import CustomHits from './components/Hits/CustomHits';

const islandName = 'algolia-search';
const appId = 'FKQ9KXS4B7';
const key = 'b59f434249ba65222c8973874f23095a';
const searchClient = algoliasearch(appId, key);

const searchIndex = 'techsource_resources';
const searchIndexAsc = 'techsource_resources_title_asc';
const searchIndexDesc = 'techsource_resources_title_desc';


const Search = () => {
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



  return (
    <>
      <a href="#results" className="visually-hidden">Skip to results</a>
      <InstantSearch
        searchClient={searchClient}
        indexName={searchIndexAsc}
        routing={true}
        future={{ preserveSharedStateOnUnmount: true }}
      >
        <Container>
          <FilterForm />
          <div>
            <SortBy />
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
