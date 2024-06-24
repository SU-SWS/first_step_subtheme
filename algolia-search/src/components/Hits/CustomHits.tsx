import { useInfiniteHits, useInstantSearch } from 'react-instantsearch';
import Hit from './Hit';
import { StanfordHit } from './hit.types';
import LoadingIndicator from '../LoadingIndicator';
import { ResultsContainer } from '../Containers';

const CustomHits = () => {
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
        <li style={{ display: 'flex' }}>
          <button onClick={showMore} className="su-button--secondary" style={{ margin: '5rem auto' }}>
            Show more results
          </button>
        </li>
      )}
    </ResultsContainer>
  );
};

export default CustomHits;
