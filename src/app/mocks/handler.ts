import { rest } from 'msw';
import { environment } from '../../environments/environment';
import { mockBeers } from './beers.mock';
export const handlers = [
  rest.get(`${environment.apiUrl}/beers`, (req, res, ctx) => {
    return res(ctx.json(mockBeers));
  }),
];
