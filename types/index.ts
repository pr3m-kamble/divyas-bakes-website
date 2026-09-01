export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category: string | null;
  image_url: string | null;
  available: boolean;
  featured: boolean;
  created_at: string;
};

export type Banner = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  is_active: boolean;
  show_popup: boolean;
  start_date: string | null;
  end_date: string | null;
};
