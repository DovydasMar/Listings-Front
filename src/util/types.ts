export type AdsObjType = {
  id: number;
  title: string;
  main_img_url: string;
  description: string;
  price: number;
  phone: number;
  type: string;
  town_id: number;
  user_id: number;
  category_id: number;
  town: string;
  category: string;
};
export type TownObjType = {
  id: number;
  name: string;
  population: number;
  area: number;
  img_url: string;
  kiekis: number;
  img_1: string;
  img_2: string;
  img_3: string;
};
export type CategoryObjType = {
  id: number;
  name: string;
};
export type LoginObjType = {
  email: string;
  password: string;
};
export type RegisterObjType = {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
};

export type UserObjType = {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  created_at: string;
  id: number;
};
export type adObjtoBackType = Omit<AdsObjType, 'id' | 'town' | 'category'>;
