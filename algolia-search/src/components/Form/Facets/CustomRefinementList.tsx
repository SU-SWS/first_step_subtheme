import { useRefinementList, useClearRefinements } from "react-instantsearch";
import { type UseRefinementListProps } from "react-instantsearch";
import { CheckboxLabel, ClearAllRefinements } from './';

type CustomRefinementListProps = UseRefinementListProps & {
  title: string,
};

const CustomRefinementList = ({ title, attribute, limit = 1000, sortBy = ['name:asc'] }: CustomRefinementListProps) => {

  const { items, refine, canRefine } = useRefinementList({
    attribute: attribute,
    limit: limit,
    sortBy: sortBy,
  });

  return (
    <>
    <fieldset style={{ marginTop: "2rem" }}>
      <legend style={{ fontSize: "2.4rem" }}>{title}</legend>
      { canRefine && (
        <ul style={{ listStyle: "none", paddingLeft: "0", marginInline: "0" }}>
          {items.map((item, i) =>
            <li key={i} style={{ marginBottom: "0" }}>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  onChange={() => refine(item.value)}
                  checked={item.isRefined}
                />
                <div style={{ marginTop: "1px" }}>
                  {item.value} ({item.count})
                </div>
              </CheckboxLabel>
            </li>
          )}
        </ul>
      )}
      { !canRefine && ( <><p>No options available</p><ClearAllRefinements /></> )}
    </fieldset>
    </>
  );
};

export default CustomRefinementList;
