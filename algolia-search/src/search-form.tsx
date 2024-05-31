import styled from "styled-components";
import {
  useCurrentRefinements,
  useInstantSearch,
  useRefinementList,
  useSearchBox
} from "react-instantsearch";
import { useEffect, useRef } from "preact/compat";

const FilterContainer = styled.div`
  margin-top: 39px;

  @media (min-width: 576px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 6rem;
  }

  @media (min-width: 768px) {
    display: block;
    float: left;
    width: 33%;
    padding-right: 2rem;
  }
`;

const ChipsButton = styled.button`
  color: #006CB8;
  margin-right: 1.2rem;
  margin-bottom: 1.2rem;
  border-radius: 26px;
  border: 2px solid #006CB8;
  background-color: #FFF;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

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
  display: inline-block;
  margin-top: 2.6rem;
  cursor: pointer;
  text-decoration: none;
  
  &:hover,
  &:focus,
  &:active {
    color: #2e2d29;
    text-decoration: underline;
  }
`;

const SearchForm = (props) => {

  const { query, refine } = useSearchBox(props);
  const { items: pageTypeRefinements, refine: refinePageTypes } = useRefinementList({
    attribute: "basic_page_type",
    limit: 1000,
  });
  const { items: sharedRefinements, refine: refineSharedTypes } = useRefinementList({
    attribute: "shared_tags",
    limit: 1000,
    sortBy: ["name:asc"]
  });

  const hasRefinedItems = pageTypeRefinements.some(item => item.isRefined) || sharedRefinements.some(item => item.isRefined);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("key");
    searchParams.delete("page-type");
    searchParams.delete("shared");

    if (query) searchParams.set("key", query);
    const pageTypes = pageTypeRefinements.filter(item => item.isRefined).map(item => item.value);
    const sharedTypes = sharedRefinements.filter(item => item.isRefined).map(item => item.value);

    if (pageTypes.length >= 1) searchParams.set("page-type", pageTypes.join(','));
    if (sharedTypes.length >= 1) searchParams.set("shared", sharedTypes.join(','));

    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  }, [query, pageTypeRefinements, sharedRefinements]);

  const formRef = useRef(null);

  return (
    <form
      ref={formRef}
      role="search"
      onReset={(e) => {
        pageTypeRefinements.map(refinementItem => {
          if (refinementItem.isRefined) refinePageTypes(refinementItem.value);
        });
        sharedRefinements.map(refinementItem => {
          if (refinementItem.isRefined) refineSharedTypes(refinementItem.value);
        });
      }}
    >
      <FilterContainer>
        <h2>Filter By</h2>
        {/* Chips */}
        <div>
          {pageTypeRefinements.map((item, i) => {
            return item.isRefined && <ChipsButton key={i} onClick={() => refinePageTypes(item.value)}>{item.value}</ChipsButton>;
          })}
          {sharedRefinements.map((item, i) => {
            return item.isRefined && <ChipsButton key={`shared-${i}`} onClick={() => refineSharedTypes(item.value)}>{item.value}</ChipsButton>;
          })}
        </div>
        {hasRefinedItems && <ResetLink onClick={(e) => { e.preventDefault(); formRef.current.reset(); }}>Clear all filters</ResetLink>}
        <fieldset style={{marginTop: "2rem"}}>
          <legend style={{fontSize: "2.4rem"}}>Resources</legend>

          <ul style={{listStyle: "none", paddingLeft: "0", marginInline: "0"}}>
            {pageTypeRefinements.map((item, i) =>
              <li
                key={i}
                style={{marginBottom: "0"}}
              >
                <label style={{
                  marginTop: "0",
                  paddingTop: ".6rem",
                  paddingBottom: ".6rem",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "2rem",
                  width: "fit-content",
                }}>
                  <input
                    type="checkbox"
                    onChange={() => refinePageTypes(item.value)}
                    checked={item.isRefined}
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: "0",
                    }}
                  />
                  <div style={{marginTop: "1px"}}>
                    {item.value} ({item.count})
                  </div>
                </label>
              </li>
            )}
          </ul>
        </fieldset>
        <fieldset style={{marginTop: "2rem", marginBottom: "10rem"}}>
          <legend style={{fontSize: "2.4rem"}}>Allowed Users</legend>

          <ul style={{listStyle: "none", paddingLeft: "0", marginInline: "0"}}>
            {sharedRefinements.map((item, i) =>
              <li
                key={`shared-i`}
                style={{marginBottom: "0"}}
              >
                <label style={{
                  marginTop: "0",
                  paddingTop: ".6rem",
                  paddingBottom: ".6rem",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "2rem",
                  width: "fit-content",
                }}>
                  <input
                    type="checkbox"
                    onChange={() => refineSharedTypes(item.value)}
                    checked={item.isRefined}
                    style={{
                      width: "24px",
                      height: "24px",
                      flexShrink: "0",
                    }}
                  />
                  <div style={{marginTop: "1px"}}>
                    {item.value} ({item.count})
                  </div>
                </label>
              </li>
            )}
          </ul>
        </fieldset>
        {/* <button type="reset">Clear all filters</button> */}
      </FilterContainer>
    </form>
  );
}

// const CustomCurrentRefinements = (props) => {
//   const {items, canRefine, refine} = useCurrentRefinements(props);

//   return (
//     <ul style={{
//       listStyle: "none",
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "10px"
//     }}>
//       {items.map(refinement => {
//         return refinement.refinements.map((item, i) =>
//           <li key={`refinement-${i}`}>
//             {item.value}
//             <button disabled={!canRefine} onClick={() => refine(item)}>Clear</button>
//           </li>
//         )
//       })}
//     </ul>
//   );
// }

export default SearchForm;
