import { useRefinementList, useSearchBox } from "react-instantsearch";
import { useEffect, useRef, useState } from "preact/compat";
import MobileFilter from './MobileFilter';
import { ChipsItem, ChipsButton, ChipsContainer, ResetLink } from './Chips';
import { CheckboxLabel } from './Facets';
import { DesktopFilter } from '../Containers';
import { type JSX } from 'preact';

/**
 * Filter Form component
 */
const FilterForm = () => {
  const { items: pageTypeRefinements, refine: refinePageTypes } = useRefinementList({
    attribute: "basic_page_type",
    limit: 1000,
  });
  const { items: sharedRefinements, refine: refineSharedTypes } = useRefinementList({
    attribute: "shared_tags",
    limit: 1000,
    sortBy: ["name:asc"]
  });

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const hasRefinedItems = pageTypeRefinements.some(item => item.isRefined) || sharedRefinements.some(item => item.isRefined);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("key");
    searchParams.delete("page-type");
    searchParams.delete("shared");

    const pageTypes = pageTypeRefinements.filter(item => item.isRefined).map(item => item.value);
    const sharedTypes = sharedRefinements.filter(item => item.isRefined).map(item => item.value);

    if (pageTypes.length >= 1) searchParams.set("page-type", pageTypes.join(','));
    if (sharedTypes.length >= 1) searchParams.set("shared", sharedTypes.join(','));

    window.history.replaceState(null, '', `?${searchParams.toString()}`);
    setSelectedFilters([...pageTypes, ...sharedTypes]);
  }, [pageTypeRefinements, sharedRefinements]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChipClick = (e: JSX.TargetedMouseEvent<HTMLButtonElement>, filter: string) => {
    e.preventDefault();
    const pageTypeItem = pageTypeRefinements.find(item => item.value === filter);
    const sharedItem = sharedRefinements.find(item => item.value === filter);

    if (pageTypeItem) {
      refinePageTypes(pageTypeItem.value);
    }
    if (sharedItem) {
      refineSharedTypes(sharedItem.value);
    }

    setSelectedFilters(selectedFilters.filter(f => f !== filter));
  };

  return (
    <form
      ref={formRef}
      onReset={(e) => {
        e.preventDefault();
        pageTypeRefinements.map(refinementItem => {
          if (refinementItem.isRefined) refinePageTypes(refinementItem.value);
        });
        sharedRefinements.map(refinementItem => {
          if (refinementItem.isRefined) refineSharedTypes(refinementItem.value);
        });
        setSelectedFilters([]);
      }}
      aria-label="Filter Form"
    >
      <DesktopFilter>
        <h2>Filter By</h2>
        <ChipsContainer>
          {selectedFilters.map((filter, i) => (
            <ChipsItem key={i}>
              <ChipsButton onClick={(e: JSX.TargetedMouseEvent<HTMLButtonElement>) => handleChipClick(e, filter)} aria-label={`Clear ${filter} filter`}>{filter}</ChipsButton>
            </ChipsItem>
          ))}
        </ChipsContainer>
        {hasRefinedItems && <ResetLink href="#" onClick={(e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => { e.preventDefault(); formRef.current?.reset(); }} className="focusable">Clear all filters</ResetLink>}
        <fieldset style={{ marginTop: "2rem" }}>
          <legend style={{ fontSize: "2.4rem" }}>Resources</legend>
          <ul style={{ listStyle: "none", paddingLeft: "0", marginInline: "0" }}>
            {pageTypeRefinements.map((item, i) =>
              <li key={i} style={{ marginBottom: "0" }}>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    onChange={() => refinePageTypes(item.value)}
                    checked={item.isRefined}
                  />
                  <div style={{ marginTop: "1px" }}>
                    {item.value} ({item.count})
                  </div>
                </CheckboxLabel>
              </li>
            )}
          </ul>
        </fieldset>
        <fieldset style={{ marginTop: "2rem", marginBottom: "10rem" }}>
          <legend style={{ fontSize: "2.4rem" }}>Available to</legend>
          <ul style={{ listStyle: "none", paddingLeft: "0", marginInline: "0" }}>
            {sharedRefinements.map((item, i) =>
              <li key={`shared-${i}`} style={{ marginBottom: "0" }}>
                <CheckboxLabel>
                  <input
                    type="checkbox"
                    onChange={() => refineSharedTypes(item.value)}
                    checked={item.isRefined}
                  />
                  <div style={{ marginTop: "1px" }}>
                    {item.value} ({item.count})
                  </div>
                </CheckboxLabel>
              </li>
            )}
          </ul>
        </fieldset>
      </DesktopFilter>
      <MobileFilter
        pageTypeRefinements={pageTypeRefinements}
        refinePageTypes={refinePageTypes}
        sharedRefinements={sharedRefinements}
        refineSharedTypes={refineSharedTypes}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        handleChipClick={handleChipClick}
      />
    </form>
  );
};

export default FilterForm;
