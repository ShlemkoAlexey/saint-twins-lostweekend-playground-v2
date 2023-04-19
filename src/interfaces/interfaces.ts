export type PlaceType = 'person' | 'place' | 'all';

export type Place = {
  title: string;
  address: string;
  type: PlaceType;
};
