import MobileFilter from './MobileFilter';
import { ChipsContainer, CustomChips } from './Chips';
import { ClearAllRefinements, CustomRefinementList } from './Facets';
import { DesktopFilter } from '../Containers';

/**
 * Filter Form component
 */
const FilterForm = () => {

  return (
    <form
      aria-label="Filter Form"
    >
      <DesktopFilter>
        <h2>Filter By</h2>
        <ChipsContainer>
          <CustomChips />
        </ChipsContainer>
        <ClearAllRefinements />
        <CustomRefinementList title="Resources" attribute="basic_page_type" />
        <CustomRefinementList title="Available to" attribute="shared_tags" />
      </DesktopFilter>
      <MobileFilter />
    </form>
  );
};

export default FilterForm;
