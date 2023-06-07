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
  orderBy,
  limit as docLimit,
  where,
  runTransaction,
} from '@angular/fire/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  list,
  getDownloadURL,
} from '@angular/fire/storage';
import { IBeerRequest, IBeerRequestBase } from 'src/app/models/beerRequest';
import { Beer } from 'brewdog-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ImpactBrewsApiService {
  firestore: Firestore = inject(Firestore);
  readonly beerColName = 'beers';
  readonly perPageKey = 'per_page';

  constructor(private toastr: ToastrService) {}

  /**
   *
   * @param limit defaults to 100
   * @returns list of beers with a limit
   */
  async getBeers(limit?: number): Promise<IBeer[]> {
    try {
      const q = query(this.beerColRef, orderBy('name'), docLimit(limit ?? 100));
      const querySnapshot = await getDocs(q);

      const mapped: IBeer[] = querySnapshot.docs.map((doc) => {
        return {
          ...(doc.data() as IBeer),
          id: doc.id,
        };
      });

      return Promise.resolve(mapped);
    } catch (error) {
      this.toastr.error("We couldn't get your beers", 'Something went wrong');
      return Promise.reject();
    }
  }

  /**
   *
   * @param limit defaults to 100
   * @returns list of beers with a limit
   */
  async searchBeers(searchTerm: string) {
    try {
      const q = query(
        this.beerColRef,
        where('searchOptions', 'array-contains', searchTerm.toLocaleLowerCase())
      );
      const querySnapshot = await getDocs(q);

      const mapped: IBeer[] = querySnapshot.docs.map((doc) => {
        return {
          ...(doc.data() as IBeer),
          id: doc.id,
        };
      });

      return Promise.resolve(mapped);
    } catch (error) {
      this.toastr.error("We couldn't find your beers", 'Something went wrong');
      return Promise.reject();
    }
  }

  async getBeer(id: string): Promise<IBeer> {
    try {
      const beer = await getDoc(doc(this.firestore, this.beerColName, id));

      return Promise.resolve({
        ...(beer.data() as IBeerRequest),
        id: beer.id,
      });
    } catch (error) {
      this.toastr.error("We couldn't get your beer", 'Something went wrong');
      return Promise.reject();
    }
  }

  async addBeer(beer: IBeerRequest, image?: File) {
    try {
      const imageUrl = image ? await this.uploadImage(image) : beer.image_url;
      const newBeer = await addDoc(
        this.beerColRef,
        this.buildRequest({ ...beer, image_url: imageUrl })
      );

      Promise.resolve();
    } catch (error) {
      this.toastr.error("We couldn't add your beer", 'Something went wrong');
      Promise.reject();
    }
  }

  async uploadImage(imageRef: File) {
    const storage = getStorage();
    const mountainImagesRef = ref(
      storage,
      `images/${imageRef.name + new Date().getTime()}`
    );
    const upload = await uploadBytes(mountainImagesRef, imageRef);
    console.log('UPLOAD: ', upload);
    return await getDownloadURL(mountainImagesRef);
  }

  private get beerColRef() {
    return collection(this.firestore, this.beerColName);
  }

  private buildRequest(beer: IBeerRequest): IBeerRequestBase {
    const splitter = (str: string) => {
      const arr = [];
      for (let i = 1; i < str.length + 1; i++) {
        arr.push(str.substring(0, i).toLocaleLowerCase());
      }

      return arr;
    };
    return {
      abv: beer.abv,
      description: beer.description,
      name: beer.name,
      ibu: beer.ibu,
      ph: beer.ph,
      image_url: beer.image_url,
      tagline: beer.tagline,
      firstBrewed: beer.firstBrewed,
      searchOptions: splitter(beer.name),
    };
  }

  /**
   * Used to setup base line for beers. ONLY USE ONCE
   */
  async bootstrapBeers() {
    const beers = new Beer();
    const map: IBeerRequest[] = await (
      await beers.all()
    ).map((beer) => {
      return this.buildRequest({ ...beer, firstBrewed: beer.first_brewed });
    });
    console.log(map);
    map.forEach(async (b) => {
      await this.addBeer(b);
    });
  }
}
