import { Highlight, Snippet } from "react-instantsearch";
import { HitContainer, DetailsContainer } from "../Containers";
import { type DefaultHitType } from "./hit.types";

export type DefaultHitProps = {
  hit: DefaultHitType;
};

const DefaultHit = ({ hit }: DefaultHitProps) => {
  const hitUrl = new URL(hit.url);

  return (
    <HitContainer>
      <DetailsContainer>
        <div>
          <h2>
            <a href={hit.url.replace(hitUrl.origin, '')}>
              {hit.title}
            </a>
          </h2>

          {hit.summary &&
            <p className="summary">
              <Highlight hit={hit} attribute="summary"/>
            </p>
          }

          {(!hit.summary && hit.html) &&
            <p>
              <Snippet hit={hit} attribute="html"/>
            </p>
          }
        </div>

        {hit.updated &&
          <div>
            Last
            Updated: {new Date(hit.updated * 1000).toLocaleDateString('en-us', {
            month: "long",
            day: "numeric",
            year: "numeric"
          })}
          </div>
        }
      </DetailsContainer>
      {hit.photo &&
        <img src={hit.photo} alt="" />
      }
    </HitContainer>
  )
}

export default DefaultHit;
