import { IBeerRequest } from './beerRequest';

// export type IHopAdd = 'start' | 'middle' | 'end';
// export type IHopAttribute = 'bitter' | 'flavour';
// export type IValue = {
//   value: number;
//   unit: 'litres' | 'kilograms' | 'grams' | 'celsius';
// };
// export interface IBeer {
//   id: number;
//   name: string;
//   tagline: string;
//   first_brewed: string;
//   description: string;
//   image_url: string;
//   abv: number;
//   ibu: number;
//   target_fg: number;
//   target_og: number;
//   ebc: number;
//   srm: number;
//   ph: number;
//   attenuation_level: number;
//   volume: IValue;
//   boil_volume: IValue;
//   method: {
//     mash_temp: {
//       duration?: number | null;
//       temp: IValue;
//     }[];
//     fermentation: {
//       temp: IValue;
//     };
//     twist: string | null;
//   };
//   ingredients: {
//     malt: {
//       name: string;
//       amount: IValue;
//     }[];
//     hops: {
//       name: string;
//       amount: IValue;
//       add: IHopAdd;
//       attribute: IHopAttribute;
//     }[];
//     yeast: string;
//   };
//   food_pairing: string[];
//   brewers_tips: string;
//   contributed_by: string;
// }

export interface IBeer extends IBeerRequest {
  id: string;
}
