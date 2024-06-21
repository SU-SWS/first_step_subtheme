import React from 'react';
import { StanfordHit } from './hit.types';
import EventHit from './EventHit';
import NewsHit from './NewsHit';
import DefaultHit from './DefaultHit';

const Hit = ({ hit } : {hit: StanfordHit}) => {
  if (hit.type === 'Event') return <EventHit hit={hit} />;
  if (hit.type === 'News') return <NewsHit hit={hit} />;
  return <DefaultHit hit={hit} />;
};

export default Hit;
