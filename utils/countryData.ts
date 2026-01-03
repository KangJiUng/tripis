import locations from '@/data/locations.json';

export type BaseCity = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export type OverseasCity = BaseCity & {
  en: string;
  country: string;
};

export type City = BaseCity | OverseasCity;

export const countryTabs = [
  { key: 'all', label: '전체' },
  { key: 'japan', label: '일본' },
  { key: 'southeast_asia', label: '동남아시아' },
  { key: 'south_pacific', label: '남태평양' },
  { key: 'europe', label: '유럽' },
  { key: 'americas', label: '미주' },
  { key: 'latin_america', label: '중남미' },
  { key: 'west_asia', label: '서아시아' },
  { key: 'greater_china', label: '중화/중국' },
  { key: 'domestic', label: '국내' },
];

export const countryDataMap: Record<string, City[]> = {
  japan: locations.overseas.japan,
  southeast_asia: locations.overseas.southeast_asia,
  south_pacific: locations.overseas.south_pacific,
  europe: locations.europe,
  americas: locations.americas,
  latin_america: locations.latin_america,
  west_asia: locations.west_asia,
  greater_china: locations.greater_china,
  domestic: locations.domestic,
};

export const allCities: City[] = Object.values(countryDataMap).flat();
