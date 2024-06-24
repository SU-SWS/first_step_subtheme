import { useClearRefinements } from "react-instantsearch";
import { ResetLink } from '../Chips';
import { type JSX } from 'preact';

const ClearAllRefinements = () => {

  const { refine, canRefine } = useClearRefinements({ includedAttributes: ['basic_page_type', 'shared_tags'] });

  const handleResetClick = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    refine();
  };

  if (!canRefine) {
    return null;
  }

  return (
    <ResetLink href={window.location.origin} onClick={handleResetClick} className="focusable">
      Clear all filters
    </ResetLink>
  );
}

export default ClearAllRefinements;
