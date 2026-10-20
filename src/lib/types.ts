export type Restaurant = {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  opening_hours: string | null;
  cover_image_url: string | null;
  logo_url: string | null;
  theme: string;
};

export type MenuItem = {
  id: string;
  restaurant_id: string;
  category: string;
  name: string;
  description: string | null;
  price: number;
  position: number;
};
