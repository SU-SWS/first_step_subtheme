import algoliasearch from 'algoliasearch/lite';
import { createIslandWebComponent } from 'preact-island';
import { InstantSearch } from 'react-instantsearch';
import FilterForm from "./components/Form/FilterForm";
import { SortBy } from "./components/Form/SortBy";
import { Container } from './components/Containers';
import CustomHits from './components/Hits/CustomHits';
import { history } from 'instantsearch.js/es/lib/routers';
import type { UiState } from 'instantsearch.js/es/types';
import type { ParsedQs } from 'qs';

export type IndexState = Partial<{
  [indexName: string]: UiState & {
    refinementList: {
      basic_page_type: string[];
      shared_tags: string[];
    };
    sortBy: string;
  }
}>;

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
        routing={{
          router: history({
            cleanUrlOnDispose: true,
            writeDelay: 10,
            parseURL: ({ qsModule, location }) => {
              const { search, hash } = location;
              const parsedQs = qsModule.parse(search.slice(1)) as ParsedQs;
              return {
                'techsource_resources_title_asc': {
                  refinementList: {
                    basic_page_type: parsedQs.resources ? parsedQs.resources : [],
                    shared_tags: parsedQs.available ? parsedQs.available : [],
                  },
                  sortBy: parsedQs.sortBy,
                  page: undefined, // Always reset to first page and let the user 'load more'
                }
              }
            },
            createURL: ({ qsModule, location, routeState }) => {
              const { origin, pathname, hash } = location;
              const indexState = routeState['techsource_resources_title_asc'] || {};
              const queryString = qsModule.stringify({
                resources: indexState?.refinementList?.['basic_page_type'] || undefined,
                available: indexState?.refinementList?.['shared_tags'] || undefined,
                sortBy: indexState?.sortBy || undefined,
                page: indexState?.page || undefined,
              });
              return `${origin}${pathname}${queryString ? '?' : ''}${queryString}${hash}`;
            },
          }),
        }}
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
