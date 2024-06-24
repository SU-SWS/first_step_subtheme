import { FunctionComponent, JSX } from 'preact';
import { useState } from "preact/compat";
import { MobileFilterContainer } from '../Containers';
import { CustomRefinementList, FilterDropdownButton } from './Facets';
import { MobileChipsContainer, MobileResetLink, CustomChips } from './Chips';
import { SubDropDownButton, DropDownContent, MobileFilterButton } from './Facets';
import { useCurrentRefinements, useClearRefinements } from 'react-instantsearch';

/**
 * Mobile Filter component
 */
const MobileFilter = () => {

  // State of refinements.
  const { canRefine: hasResource } = useCurrentRefinements({ includedAttributes: ['basic_page_type'] });
  const { canRefine: hasAvailable} = useCurrentRefinements({ includedAttributes: ['shared_tags'] });
  const { refine:clearAllRefinements, canRefine } = useClearRefinements({ includedAttributes: ['basic_page_type', 'shared_tags'] });


  // State for mobile filter dropdown.
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState<boolean>(hasResource);
  const [usersOpen, setUsersOpen] = useState<boolean>(hasAvailable);

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
          {canRefine && (
            <MobileChipsContainer>
              <CustomChips isMobile />
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
              <CustomRefinementList title="Resources" attribute="basic_page_type" isMobile />
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
              <CustomRefinementList title="Available to" attribute="shared_tags" isMobile />
            </DropDownContent>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem 1.4rem', backgroundColor: '#F4F4F4' }}>
            <MobileResetLink href={window.location.origin} onClick={(e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => { e.preventDefault(); clearAllRefinements() }}>Clear all filters</MobileResetLink>
            <MobileFilterButton onClick={handleApply}>View results</MobileFilterButton>
          </div>
        </div>
      )}
    </MobileFilterContainer>
  );
};

export default MobileFilter;
