export type IBeerRequest = Omit<IBeerRequestBase, 'searchOptions'>;

export type IBeerRequestBase = {
  name: string;
  description: string;
  abv: number;
  ibu: number;
  ph: number;
  image_url: string;
  tagline: string;
  searchOptions: string[];
  firstBrewed: string;
};
