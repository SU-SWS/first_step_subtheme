import styled from "styled-components";
import {
  useCurrentRefinements,
  useInstantSearch,
  useRefinementList,
  useSearchBox
} from "react-instantsearch";
import {useEffect, useRef} from "preact/compat";

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
`

const SearchForm = (props) => {

  const {query, refine} = useSearchBox(props);
  const {items: pageTypeRefinements, refine: refinePageTypes} = useRefinementList({
    attribute: "basic_page_type",
    limit: 1000,
  });
  const {items: sharedRefinements, refine: refineSharedTypes} = useRefinementList({
    attribute: "shared_tags",
    limit: 1000,
    sortBy: ["name:asc"]
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("key")
    searchParams.delete("page-type")
    searchParams.delete("shared")

    if (query) searchParams.set("key", query);
    const pageTypes = pageTypeRefinements.filter(item => item.isRefined).map(item => item.value);
    const sharedTypes = sharedRefinements.filter(item => item.isRefined).map(item => item.value);

    if (pageTypes.length >= 1) searchParams.set("page-type", pageTypes.join(','))
    if (sharedTypes.length >= 1) searchParams.set("shared", sharedTypes.join(','))

    window.history.replaceState(null, '', `?${searchParams.toString()}`);
  }, [query, pageTypeRefinements, sharedRefinements])

  return (
    <form
      role="search"
      onReset={(e) => {
        pageTypeRefinements.map(refinementItem => {
          if (refinementItem.isRefined) refinePageTypes(refinementItem.value)
        })
        sharedRefinements.map(refinementItem => {
          if (refinementItem.isRefined) refineSharedTypes(refinementItem.value)
        })
      }}
    >
      <FilterContainer>
        <h2>Filter By</h2>
        {/* Chips */}
        {pageTypeRefinements.map((item, i) => {
          return item.isRefined && <button onClick={() => refinePageTypes(item.value)}>{item.value}</button>

        })}
        {sharedRefinements.map((item, i) => {
          return item.isRefined && <button onClick={() => refinePageTypes(item.value)}>{item.value}</button>

        })}
        <fieldset>
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
        <fieldset>
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
        <button type="reset">Clear all</button>
      </FilterContainer>
    </form>
  );
}

const CustomCurrentRefinements = (props) => {
  const {items, canRefine, refine} = useCurrentRefinements(props);

  return (
    <ul style={{
      listStyle: "none",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px"
    }}>
      {items.map(refinement => {
        return refinement.refinements.map((item, i) =>
          <li key={`refinement-${i}`}>
            {item.value}
            <button disabled={!canRefine} onClick={() => refine(item)}>Clear</button>
          </li>
        )
      })}
    </ul>
  );
}

export default SearchForm;
