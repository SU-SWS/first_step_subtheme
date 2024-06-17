import styled from "styled-components";
import { useState } from "preact/compat";

const MobileFilterContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const ChipsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 1.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ccc;
`;

const ChipsItem = styled.li`
  margin-right: 1.2rem;
  margin-bottom: 1.2rem;
`;

const ChipsButton = styled.button`
  color: #006CB8;
  border-radius: 26px;
  border: 2px solid #006CB8;
  background-color: #FFF;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 1.6rem;
  padding: .8rem 1.75rem .65rem;

  &::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11' fill='none'%3E%3Cpath d='M6.59834 5.44179L10.32 1.75345C10.68 1.39679 10.6825 0.816786 10.3258 0.456786C9.96918 0.0967863 9.38918 0.0951197 9.02918 0.450953L5.29584 4.15095L1.56334 0.450953C1.20418 0.0951197 0.623342 0.0984529 0.266676 0.45762C-0.089991 0.816786 -0.087491 1.39679 0.272509 1.75345L3.99334 5.44179L0.271676 9.13012C-0.0883243 9.48679 -0.0908242 10.0668 0.265842 10.4268C0.445009 10.6076 0.680842 10.6976 0.916676 10.6976C1.15001 10.6976 1.38334 10.6101 1.56168 10.4326L5.29584 6.73262L9.02834 10.4326C9.20751 10.6101 9.44001 10.6976 9.67334 10.6976C9.90918 10.6976 10.145 10.6076 10.3242 10.4268C10.6808 10.0668 10.6783 9.48679 10.3183 9.13012L6.59834 5.44179Z' fill='%23006CB8'/%3E%3C/svg%3E");
    display: inline-block;
    margin-left: 1rem;
  }

  &:hover,
  &:focus,
  &:active {
    background-color: #FFF;
    color: #00548F;

    &::after {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11' fill='none'%3E%3Cpath d='M6.59834 5.44179L10.32 1.75345C10.68 1.39679 10.6825 0.816786 10.3258 0.456786C9.96918 0.0967863 9.38918 0.0951197 9.02918 0.450953L5.29584 4.15095L1.56334 0.450953C1.20418 0.0951197 0.623342 0.0984529 0.266676 0.45762C-0.089991 0.816786 -0.087491 1.39679 0.272509 1.75345L3.99334 5.44179L0.271676 9.13012C-0.0883243 9.48679 -0.0908242 10.0668 0.265842 10.4268C0.445009 10.6076 0.680842 10.6976 0.916676 10.6976C1.15001 10.6976 1.38334 10.6101 1.56168 10.4326L5.29584 6.73262L9.02834 10.4326C9.20751 10.6101 9.44001 10.6976 9.67334 10.6976C9.90918 10.6976 10.145 10.6076 10.3242 10.4268C10.6808 10.0668 10.6783 9.48679 10.3183 9.13012L6.59834 5.44179Z' fill='%2300548F'/%3E%3C/svg%3E");
    }
  }
`;

const ResetLink = styled.a`
  text-decoration: none;
  color: #B1040E;
  align-self: center;
  font-size: 2rem;
  font-weight: 400;
  
  &:hover,
  &:focus,
  &:active {
    color: #2e2d29;
    text-decoration: underline;
  }
`;

const FilterDropdownButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  border: 1px solid #B1040E;
  padding: 1.2rem 1.4rem;
  background-color: ${({ isOpen }) => (isOpen ? '#B1040E' : '#fff')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  color: ${({ isOpen }) => (isOpen ? '#fff' : '#B1040E')};

  &:hover,
  &:focus,
  &:active {
    color: ${({ isOpen }) => (isOpen ? '#fff' : '#B1040E')};
    background-color: ${({ isOpen }) => (isOpen ? '#B1040E' : '#fff')};
  }

  &::before {
    background: ${({ isOpen }) => (isOpen ? 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" %3E%3Cpath d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8 4.22 10.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" /%3E%3C/svg%3E");' : 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" %3E%3Cpath fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /%3E%3C/svg%3E");')};
  }
`;

const SubDropdownButton = styled.button`
  width: 100%;
  border: none;
  padding: 1.2rem 1.4rem;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: #2e2d29;
  
  &:hover,
  &:focus,
  &:active {
    background-color: transparent;
    color: #2e2d29;
    box-shadow: none;
  }
`;

const DropdownContent = styled.ul`
  padding: 0rem 1rem 1rem 2.8rem;
  margin: 0;
  list-style: none;
`;

const MobileFilterButton = styled.button`
  display: block;
  width: auto;
`;

const CheckboxLabel = styled.label`
  margin-top: 0;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  display: flex;
  align-items: center;
  font-size: 2rem;
  width: fit-content;
`;

interface MobileFilterProps {
  pageTypeRefinements: any;
  refinePageTypes: (value: string) => void;
  sharedRefinements: any;
  refineSharedTypes: (value: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  handleChipClick: (e: React.MouseEvent<HTMLButtonElement>, filter: string) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  pageTypeRefinements,
  refinePageTypes,
  sharedRefinements,
  refineSharedTypes,
  selectedFilters,
  setSelectedFilters,
  handleChipClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(
    pageTypeRefinements.some((item: any) => item.isRefined)
  );
  const [usersOpen, setUsersOpen] = useState(
    sharedRefinements.some((item: any) => item.isRefined)
  );

  const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const toggleResourcesOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setResourcesOpen(!resourcesOpen);
  };

  const toggleUsersOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleClearAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSelectedFilters([]);
    pageTypeRefinements.forEach((item: any) => item.isRefined && refinePageTypes(item.value));
    sharedRefinements.forEach((item: any) => item.isRefined && refineSharedTypes(item.value));
  };

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <ChipsContainer>
              {selectedFilters.map((filter, i) => (
                <ChipsItem key={i}>
                  <ChipsButton onClick={(e) => handleChipClick(e, filter)} aria-label={`Clear ${filter} filter`}>{filter}</ChipsButton>
                </ChipsItem>
              ))}
            </ChipsContainer>
          )}
          <SubDropdownButton onClick={toggleResourcesOpen}>
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
          </SubDropdownButton>
          {resourcesOpen && (
            <DropdownContent>
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
            </DropdownContent>
          )}
          <SubDropdownButton onClick={toggleUsersOpen} style={{ borderTop: '1px solid #ccc' }}>
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
          </SubDropdownButton>
          {usersOpen && (
            <DropdownContent>
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
            </DropdownContent>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem 1.4rem', backgroundColor: '#F4F4F4' }}>
            <ResetLink href="#" onClick={handleClearAll}>Clear all filters</ResetLink>
            <MobileFilterButton onClick={handleApply}>View results</MobileFilterButton>
          </div>
        </div>
      )}
    </MobileFilterContainer>
  );
};

export default MobileFilter;
