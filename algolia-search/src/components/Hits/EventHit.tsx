import DefaultHit from "./DefaultHit";
import { type EventHitType } from "./hit.types";

type EventHitProps = {
  hit: EventHitType;
};

const EventHit = ({ hit }: EventHitProps) => {
  return <DefaultHit hit={hit} />
}
export default EventHit;
