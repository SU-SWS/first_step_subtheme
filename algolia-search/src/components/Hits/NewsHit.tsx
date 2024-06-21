
import DefaultHit from "./DefaultHit";
import { type NewsHitType } from "./hit.types";

type NewsHitProps = {
  hit: NewsHitType;
};

const NewsHit = ({ hit }: NewsHitProps) => {
  return <DefaultHit hit={hit} />
}
export default NewsHit;
