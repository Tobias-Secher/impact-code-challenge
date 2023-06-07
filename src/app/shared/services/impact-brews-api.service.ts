import { Injectable, inject } from '@angular/core';
import { IBeer } from 'src/app/models/beer';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  getDoc,
  doc,
  where,
  orderBy,
  limit as docLimit,
} from '@angular/fire/firestore';
import { IBeerRequest } from 'src/app/models/beerRequest';

@Injectable({
  providedIn: 'root',
})
export class ImpactBrewsApiService {
  firestore: Firestore = inject(Firestore);
  readonly beerColName = 'beers';
  readonly perPageKey = 'per_page';

  constructor() {}

  /**
   *
   * @param limit defaults to 100
   * @returns list of beers with a limit
   */
  async getBeers(limit?: number): Promise<IBeer[]> {
    const q = query(this.beerColRef, orderBy('name'), docLimit(limit ?? 100));
    const querySnapshot = await getDocs(q);

    const mapped: IBeer[] = querySnapshot.docs.map((doc) => {
      return {
        ...(doc.data() as IBeer),
        id: doc.id,
      };
    });

    return Promise.resolve(mapped);
  }

  async getBeer(id: string): Promise<IBeer> {
    const beer = await getDoc(doc(this.firestore, this.beerColName, id));

    return Promise.resolve({
      ...(beer.data() as IBeerRequest),
      id: beer.id,
    });
  }

  addBeer(beer: IBeerRequest) {
    addDoc(this.beerColRef, beer);
  }

  private get beerColRef() {
    return collection(this.firestore, this.beerColName);
  }
}
