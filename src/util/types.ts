export type AdsObjType = {
  id: number;
  title: string;
  main_img_url: string;
  description: string;
  price: number;
  phone: number;
  type: 'sell' | 'buy' | 'rent';
  town_id: number;
  user_id: number;
  category_id: number;
  created_at: string;
  is_published: number;
};
export type TownObjType = {
  id: number;
  name: string;
  population: number;
  area: number;
};
export type CategoryObjType = {
  id: number;
  name: string;
};