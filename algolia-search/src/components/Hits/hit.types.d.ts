import type { Hit } from '@algolia/client-search';

export type AlgoliaHit = Hit & {
  id: string;
  name: string;
  _tags?: string[];
};

export type DefaultHitType = AlgoliaHit & {
  type: 'Basic Page' | 'Course' | 'Event' | 'Event Series' | 'News' | 'Person' | 'Policy' | 'Publication'
  url: string
  person_full_title?: string
  person_short_title?: string
  photo?: string
  html: string
  summary?: string
  created: number
  status: boolean
  title: string
  updated: number
}

export type NewsHitType = DefaultHitType & {
  byline?: string
  dek?: string
}

export type PersonHitType = DefaultHitType & {
  type: 'Person'
  person_full_title?: string
  person_short_title?: string
  email?: string
  phone?: number
}

export type EventHitType = DefaultHitType & {
  type: 'Event'
  event_end: number
  event_start: number
  dek?: string
  email?: string
  subheadline?: string
}
export type EventSeriesType = DefaultHitType & {
  type: 'Event Series'
  dek?: string
  subheadline?: string
}

export type StanfordHit = EventHitType | PersonHitType | NewsHitType | EventSeriesType | DefaultHitType;
