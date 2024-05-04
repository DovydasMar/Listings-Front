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
  created_at: Date;
  pic1: string;
  pic2: string;
  pic3: string;
  pic4: string;
  pic5: string;
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
export type adObjtoBackType = {
  title: string;
  main_img_url: string;
  description: string;
  price: number;
  phone: number;
  type: string;
  town_id: number;
  user_id: number;
  category_id: number;
};
export type UpdateUserInfoType = {
  email: string;
  name: string;
  userId: number;
};
export type UpdateUserObjType = {
  name?: string;
  email: string;
  currentPassword: string;
  password: string;
  passwordConfirm: string;
  avatar_url?: string;
};
