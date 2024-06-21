import { FunctionComponent, JSX } from 'preact';
import { useState } from "preact/compat";
import { MobileFilterContainer } from '../Containers';
import { FilterDropdownButton } from './Facets';
import { MobileChipsContainer, MobileChipsItem, MobileChipsButton, MobileResetLink } from './Chips';
import { SubDropDownButton, DropDownContent, CheckboxLabel, MobileFilterButton } from './Facets';

interface MobileFilterProps {
  pageTypeRefinements: any;
  refinePageTypes: (value: string) => void;
  sharedRefinements: any;
  refineSharedTypes: (value: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  handleChipClick: (e: JSX.TargetedMouseEvent<HTMLButtonElement>, filter: string) => void;
}

const MobileFilter: FunctionComponent<MobileFilterProps> = ({
  pageTypeRefinements,
  refinePageTypes,
  sharedRefinements,
  refineSharedTypes,
  selectedFilters,
  setSelectedFilters,
  handleChipClick
}) => {

  // State for mobile filter dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(
    pageTypeRefinements.some((item: any) => item.isRefined)
  );
  const [usersOpen, setUsersOpen] = useState(
    sharedRefinements.some((item: any) => item.isRefined)
  );

  // Functions for mobile filter dropdown
  const toggleOpen: JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const toggleResourcesOpen: JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setResourcesOpen(!resourcesOpen);
  };

  const toggleUsersOpen: JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setUsersOpen(!usersOpen);
  };

  const handleCheckboxChange = (refineFn: (value: string) => void, item: any) => {
    const isSelected = selectedFilters.includes(item.value);
    if (isSelected) {
      setSelectedFilters(selectedFilters.filter(filter => filter !== item.value));
    } else {
      setSelectedFilters([...selectedFilters, item.value]);
    }
    refineFn(item.value);
  };

  const handleClearAll: JSX.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setSelectedFilters([]);
    pageTypeRefinements.forEach((item: any) => item.isRefined && refinePageTypes(item.value));
    sharedRefinements.forEach((item: any) => item.isRefined && refineSharedTypes(item.value));
  };

  const handleApply: JSX.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <MobileFilterContainer>
      <FilterDropdownButton isOpen={isOpen} onClick={toggleOpen}>
        {isOpen ? 'Filter results by' : 'Filter results'}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            height="24px"
            width="24px"
          >
            <path
              d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8 4.22 10.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            height="24px"
            width="24px"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </FilterDropdownButton>
      {isOpen && (
        <div style={{ border: '1px solid #d2d3d4', borderTop: '0' }}>
          {selectedFilters.length > 0 && (
            <MobileChipsContainer>
              {selectedFilters.map((filter, i) => (
                <MobileChipsItem key={i}>
                  <MobileChipsButton onClick={(e: JSX.TargetedMouseEvent<HTMLButtonElement>) => handleChipClick(e, filter)} aria-label={`Clear ${filter} filter`}>{filter}</MobileChipsButton>
                </MobileChipsItem>
              ))}
            </MobileChipsContainer>
          )}
          <SubDropDownButton onClick={toggleResourcesOpen}>
            Resources
            {resourcesOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                height="24px"
                width="24px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75L12 8.25l7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
                height="24px"
                width="24px"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </SubDropDownButton>
          {resourcesOpen && (
            <DropDownContent>
              {pageTypeRefinements.map((item: any, i: number) => (
                <li key={i} style={{ marginBottom: '0' }}>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(refinePageTypes, item)}
                      checked={item.isRefined}
                    />
                    <div style={{ marginTop: '1px' }}>
                      {item.value} ({item.count})
                    </div>
                  </CheckboxLabel>
                </li>
              ))}
            </DropDownContent>
          )}
          <SubDropDownButton onClick={toggleUsersOpen} style={{ borderTop: '1px solid #ccc' }}>
            Available to
            {usersOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                height="24px"
                width="24px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75L12 8.25l7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
                height="24px"
                width="24px"
              >
                <path
                  fillRule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </SubDropDownButton>
          {usersOpen && (
            <DropDownContent>
              {sharedRefinements.map((item: any, i: number) => (
                <li key={i} style={{ marginBottom: '0' }}>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(refineSharedTypes, item)}
                      checked={item.isRefined}
                    />
                    <div style={{ marginTop: '1px' }}>
                      {item.value} ({item.count})
                    </div>
                  </CheckboxLabel>
                </li>
              ))}
            </DropDownContent>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem 1.4rem', backgroundColor: '#F4F4F4' }}>
            <MobileResetLink href="#" onClick={handleClearAll}>Clear all filters</MobileResetLink>
            <MobileFilterButton onClick={handleApply}>View results</MobileFilterButton>
          </div>
        </div>
      )}
    </MobileFilterContainer>
  );
};

export default MobileFilter;
