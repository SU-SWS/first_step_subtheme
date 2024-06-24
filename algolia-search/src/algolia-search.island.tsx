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

const Search = () => {
  return (
    <>
      <a href="#results" className="visually-hidden">Skip to results</a>
      <InstantSearch
        searchClient={searchClient}
        indexName='techsource_resources_title_asc'
        routing={true}
        insights={true}
        future={{
          preserveSharedStateOnUnmount: true }}
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
