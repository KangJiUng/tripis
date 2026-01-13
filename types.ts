export type LatLng = {
  lat: number;
  lng: number;
};

export type Place = {
  place_id: string;
  title: string;
  address: string;
  primary_type?: string;
  latitude: number;
  longitude: number;
  memo: string | null;
  order_index: number;
};
