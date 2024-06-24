import { ChipsItem, ChipsButton, MobileChipsItem, MobileChipsButton } from './';
import { useCurrentRefinements } from "react-instantsearch";
import { type JSX } from 'preact';
import type { CurrentRefinementsConnectorParamsRefinement } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

export type CustomChipsProps = {
  isMobile?: boolean;
}

const CustomChips = ({ isMobile = false }:CustomChipsProps) => {

  const { items, refine } = useCurrentRefinements({ includedAttributes: ['basic_page_type', 'shared_tags'] });


  const handleRefine = (e: JSX.TargetedMouseEvent<HTMLButtonElement>, value: CurrentRefinementsConnectorParamsRefinement) => {
    e.preventDefault();
    refine(value);
  }

  const normalizedItems:CurrentRefinementsConnectorParamsRefinement[] = [];
  items.forEach((attribute) => {
    attribute.refinements.forEach((refinement) => {
      normalizedItems.push(refinement);
    });
  });


  // Mobile Chips
  if (isMobile) {
    return (
      <>
      {normalizedItems.map((item, i) => (
        <MobileChipsItem key={i}>
          <MobileChipsButton onClick={(e: JSX.TargetedMouseEvent<HTMLButtonElement>) => handleRefine(e, item)} aria-label={`Clear ${item.label} filter`}>{item.label}</MobileChipsButton>
        </MobileChipsItem>
      ))}
      </>

    )
  }

  // Desktop Chips
  return (
    <>
    {normalizedItems.map((item, i) => (
      <ChipsItem key={i}>
        <ChipsButton onClick={(e: JSX.TargetedMouseEvent<HTMLButtonElement>) => handleRefine(e, item)} aria-label={`Clear ${item.label} filter`}>{item.label}</ChipsButton>
      </ChipsItem>
    ))}
    </>

  )
}

export default CustomChips;
